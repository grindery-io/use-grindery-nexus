import React from 'react';
export declare const ENGINE_URL = "https://orchestrator.grindery.org";
declare global {
    interface Window {
        nexus_auth: any;
    }
}
export declare type AuthToken = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
};
declare type FlowUser = {
    addr: string;
    services?: any[];
};
export declare type GrinderyNexusContextProps = {
    /** User ID. Reference: https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md */
    user: string | null;
    /** Authentication token object */
    token: AuthToken | null;
    /** User wallet address  */
    address: string | null;
    /** User chain id  */
    chain: number | string | null;
    /** Authorization code */
    code: string | null;
    /** Flow user object */
    flowUser: FlowUser;
    /** Ethers provider */
    provider: any;
    /** Ethers */
    ethers: any;
    /** Blockchains name */
    chainName: string | null | number;
    /** Connect user wallet */
    connect: () => void;
    /** Disconnect user wallet */
    disconnect: () => void;
    /** Set User ID  */
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
    /** Set user wallet address  */
    setAddress: React.Dispatch<React.SetStateAction<string | null>>;
    /** Set user chain id  */
    setChain: React.Dispatch<React.SetStateAction<number | string | null>>;
    /** Connect flow user */
    connectFlow: () => void;
};
export declare type GrinderyNexusContextProviderProps = {
    children: React.ReactNode;
    /** Automatically authenticate user */
    cacheProvider?: boolean;
};
/** Grindery Nexus Context */
export declare const GrinderyNexusContext: React.Context<GrinderyNexusContextProps>;
/** Grindery Nexus Context Provider */
export declare const GrinderyNexusContextProvider: (props: GrinderyNexusContextProviderProps) => JSX.Element;
/** Grindery Nexus Hook */
export declare const useGrinderyNexus: () => GrinderyNexusContextProps;
export default GrinderyNexusContextProvider;
