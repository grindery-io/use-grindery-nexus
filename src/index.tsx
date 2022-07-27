import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import {
  EthereumAuthProvider,
  SelfID,
  useViewerConnection,
  ViewerConnectionState,
  Provider,
} from "@self.id/framework";

declare global {
  interface Window {
    ethereum: any;
  }
}

export type GrinderyNexusContextProps = {
  connectUser: () => void;
  user: string | null;
  setUser: (a: string | null) => void;
  connection?: ViewerConnectionState<any>;
  connect?: (
    provider: EthereumAuthProvider
  ) => Promise<SelfID<
    any,
    "alsoKnownAs" | "basicProfile" | "cryptoAccounts"
  > | null>;
  disconnect: () => void;
};

export type GrinderyNexusContextProviderProps = {
  children: React.ReactNode;
  /** Automatically set user when authenticated */
  authenticateUser?: boolean;
};

export const createAuthProvider = async () => {
  // The following assumes there is an injected `window.ethereum` provider
  const addresses = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return new EthereumAuthProvider(window.ethereum, addresses[0]);
};

export const GrinderyNexusContext = createContext<GrinderyNexusContextProps>({
  connectUser: () => {},
  setUser: () => {},
  user: null,
  disconnect: () => {},
});

export const GrinderyNexusContextProvider = (
  props: GrinderyNexusContextProviderProps
) => {
  const children = props.children;
  const authenticateUser =
    typeof props.authenticateUser !== "undefined"
      ? props.authenticateUser
      : true;

  // Auth hook
  const [connection, connect, disconnect] = useViewerConnection();

  // User id
  const [user, setUser] = useState<any>(null);

  const connectUser = () => {
    createAuthProvider().then(connect);
  };

  const addUser = useCallback((userId: string | null) => {
    setUser(userId);
  }, []);

  useEffect(() => {
    if (authenticateUser) {
      addUser(connection.status === "connected" ? connection.selfID.id : null);
    }
  }, [connection, addUser, authenticateUser]);

  return (
    <Provider client={{ ceramic: "testnet-clay" }}>
      <GrinderyNexusContext.Provider
        value={{
          connectUser,
          user,
          setUser,
          connection,
          connect,
          disconnect,
        }}
      >
        {children}
      </GrinderyNexusContext.Provider>
    </Provider>
  );
};

export const useGrinderyNexus = () => useContext(GrinderyNexusContext);

export default GrinderyNexusContextProvider;
