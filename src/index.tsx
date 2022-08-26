import React, { useState, useEffect, createContext, useContext } from 'react';
// @ts-ignore
import Web3Modal from 'web3modal';
// @ts-ignore
import { providers } from 'ethers';

export const ENGINE_URL = 'https://orchestrator.grindery.org';

// Authentication token object definition
export type AuthToken = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
};

// Context properties definition
export type GrinderyNexusContextProps = {
  /** User ID. Reference: https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md */
  user: string | null;

  /** Authentication token object */
  token: AuthToken | null;

  /** User wallet address  */
  address: string | null;

  /** User chain id  */
  chain: number | null;

  /** Authentication message */
  message: string | null;

  /** Signed authentication message */
  signature: string | null;

  /** Connect user wallet */
  connect: () => void;

  /** Disconnect user wallet */
  disconnect: () => void;

  /** Set User ID  */
  setUser: React.Dispatch<React.SetStateAction<string | null>>;

  /** Set user wallet address  */
  setAddress: React.Dispatch<React.SetStateAction<string | null>>;

  /** Set user chain id  */
  setChain: React.Dispatch<React.SetStateAction<number | null>>;
};

export type GrinderyNexusContextProviderProps = {
  children: React.ReactNode;

  /** Automatically authenticate user */
  cacheProvider?: boolean;
};

// Default context properties
const defaultContext = {
  user: null,
  address: null,
  chain: null,
  token: null,
  message: null,
  signature: null,
  connect: () => {},
  disconnect: () => {},
  setUser: () => {},
  setAddress: () => {},
  setChain: () => {},
};

/** Grindery Nexus Context */
export const GrinderyNexusContext = createContext<GrinderyNexusContextProps>(
  defaultContext
);

/** Grindery Nexus Context Provider */
export const GrinderyNexusContextProvider = (
  props: GrinderyNexusContextProviderProps
) => {
  const children = props.children;
  const cacheProvider =
    typeof props.cacheProvider !== 'undefined' ? props.cacheProvider : true;

  // Web3Modal instance
  const [web3Modal, setWeb3Modal] = useState<any>(null);

  // Web3Provider library
  const [library, setLibrary] = useState<any>(null);

  // User account
  const [account, setAccount] = useState<string | null>(null);

  // User id
  const [user, setUser] = useState<string | null>(null);

  // User wallet address
  const [address, setAddress] = useState<string | null>(null);

  // User chain id
  const [chain, setChain] = useState<number | null>(null);

  // Auth message
  const [message, setMessage] = useState<string | null>(null);

  // Authentication token object
  const [token, setToken] = useState<AuthToken | null>(null);

  // Signed authentication message
  const [signature, setSignature] = useState<string | null>(null);

  // Subscribe to account change
  const addListeners = async (web3ModalProvider: any) => {
    web3ModalProvider.on('accountsChanged', () => {
      window.location.reload();
    });
  };

  // Connect MetaMask wallet
  const connect = async () => {
    const provider = await web3Modal.connect();
    addListeners(provider);
    const ethersProvider = new providers.Web3Provider(provider);
    const userAddress = await ethersProvider.getSigner().getAddress();
    const userChain = await ethersProvider.getSigner().getChainId();
    const accounts = await ethersProvider.listAccounts();
    setLibrary(ethersProvider);
    if (accounts) setAccount(accounts[0]);
    setAddress(userAddress);
    setChain(userChain);
  };

  // Clear user state
  const clearUserState = () => {
    setUser(null);
    setAddress(null);
    setChain(null);
    setAccount(null);
    setMessage(null);
    setToken(null);
    setSignature(null);
  };

  // Disconnect user
  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    clearUserState();
  };

  // Fetch authentication message from the engine API
  const fetchMessage = async (userAddress: string) => {
    const res = await fetch(
      `${ENGINE_URL}/oauth/eth-get-message?address=${userAddress}`
    );
    if (res.ok) {
      let json = await res.json();
      setMessage(json.message || null);
    } else {
      console.error('Fetch message error', res.status);
      clearUserState();
    }
  };

  // Sign authentication message with MetaMask
  const signMessage = async (lib: any, msg: string, userAccount: string) => {
    if (!web3Modal) return;
    try {
      const newSignature = await lib.provider.request({
        method: 'personal_sign',
        params: [msg, userAccount],
      });
      setSignature(newSignature);
    } catch (error) {
      console.error('signMessage error', error);
      clearUserState();
    }
  };

  // Get access token from the engine API
  const getToken = async (msg: string, signedMsg: string) => {
    const res = await fetch(`${ENGINE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        grant_type: 'urn:grindery:eth-signature',
        message: msg,
        signature: signedMsg,
      }),
    });

    if (res.ok) {
      let result = await res.json();
      setToken(result);
    } else {
      console.error('getToken error', res.status);
      clearUserState();
    }
  };

  // Set web3Modal instance
  useEffect(() => {
    const providerOptions = {};
    const newWeb3Modal = new Web3Modal({
      cacheProvider: cacheProvider,
      network: 'mainnet',
      providerOptions,
    });
    setWeb3Modal(newWeb3Modal);
  }, []);

  // connect automatically and without a popup if user was connected before
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect();
    }
  }, [web3Modal]);

  // set user if token and address is known
  useEffect(() => {
    if (token?.access_token && address) {
      setUser(`eip155:1:${address}`);
    } else {
      setUser(null);
    }
  }, [token?.access_token, address]);

  // Fetch authentication message if user address is known
  useEffect(() => {
    if (address) {
      fetchMessage(address);
    }
  }, [address]);

  // Sign authentication message if message is known
  useEffect(() => {
    if (library && message && account && !signature) {
      signMessage(library, message, account);
    }
  }, [library, message, account, signature]);

  // Get authentication token if message is signed
  useEffect(() => {
    if (message && signature) {
      getToken(message, signature);
    }
  }, [message, signature]);

  return (
    <GrinderyNexusContext.Provider
      value={{
        user,
        address,
        chain,
        token,
        message,
        signature,
        connect,
        disconnect,
        setUser,
        setAddress,
        setChain,
      }}
    >
      {children}
    </GrinderyNexusContext.Provider>
  );
};

/** Grindery Nexus Hook */
export const useGrinderyNexus = () => useContext(GrinderyNexusContext);

export default GrinderyNexusContextProvider;
