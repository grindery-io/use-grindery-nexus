import React, { useState, useEffect, createContext, useContext } from 'react';
// @ts-ignore
import Web3Modal from 'web3modal';
// @ts-ignore
import { providers } from 'ethers';
// @ts-ignore
import { encode } from 'universal-base64url';

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

  /** Authorization code */
  code: string | null;

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
  code: null,
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

  // Compiled authorization code
  const code =
    (message &&
      signature &&
      encode(
        JSON.stringify({
          message: message,
          signature: signature,
        })
      )) ||
    null;

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
    clearAuthSession();
  };

  // Fetch authentication message or access token from the engine API
  const startSession = async (userAddress: string) => {
    // Try to fetch access token
    const resWithCreds = await fetch(
      `${ENGINE_URL}/oauth/session?address=${userAddress}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    ); /*.catch(async err => {
      // If CORS error then fetch auth message
      console.error('startSessionWithCreds error', err.message);
      const res = await fetch(
        `${ENGINE_URL}/oauth/session?address=${userAddress}`,
        {
          method: 'GET',
        }
      );

      if (res && res.ok) {
        let json = await res.json();
        setMessage(json.message || null);
      } else {
        console.error(
          'startSession error',
          (res && res.status) || 'Unknown error'
        );
      }
    });*/

    if (resWithCreds && resWithCreds.ok) {
      let json = await resWithCreds.json();

      // Set access token if exists
      if (json.access_token) {
        setToken(json);
      } else if (json.message) {
        // Or set auth message
        setMessage(json.message);
      }
    } else {
      console.error(
        'startSessionWithCreds error',
        (resWithCreds && resWithCreds.status) || 'Unknown error'
      );
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
  const getToken = async (code: string) => {
    const res = await fetch(`${ENGINE_URL}/oauth/token?code=${code}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
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

  // Set refresh_token cookie
  const registerAuthSession = async (refresh_token: string) => {
    const res = await fetch(`${ENGINE_URL}/oauth/session-register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: refresh_token,
      }),
    });

    if (!res.ok) {
      console.error('registerAuthSession error', res.status);
    }
  };

  // Remove refresh_token cookie
  const clearAuthSession = async () => {
    const res = await fetch(`${ENGINE_URL}/oauth/session-register`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      console.error('clearAuthSession error', res.status);
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
    if (address && token && token.access_token) {
      setUser(`eip155:1:${address}`);
      if (token.refresh_token) {
        registerAuthSession(token.refresh_token);
      }
    } else {
      setUser(null);
    }
  }, [token, address]);

  // Start session if user address is known
  useEffect(() => {
    if (address && !message && !signature && !token) {
      startSession(address);
    }
  }, [address, message, signature, token]);

  // Sign authentication message if message is known
  useEffect(() => {
    if (library && message && account && !signature && !token) {
      signMessage(library, message, account);
    }
  }, [library, message, account, signature, token]);

  // Get authentication token if message is signed
  useEffect(() => {
    if (code && !token) {
      getToken(code);
    }
  }, [code, token]);

  return (
    <GrinderyNexusContext.Provider
      value={{
        user,
        address,
        chain,
        token,
        code,
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
