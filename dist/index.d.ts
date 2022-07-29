import React from 'react';
export declare type GrinderyNexusContextProps = {
    /** Connect user wallet */
    connect: () => void;
    /** Disconnect user wallet */
    disconnect: () => void;
    /** User ID. Reference: https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md */
    user: string | null;
    /** Set User ID  */
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
    /** User wallet address  */
    address: string | null;
    /** Set user wallet address  */
    setAddress: React.Dispatch<React.SetStateAction<string | null>>;
    /** User chain id  */
    chain: number | null;
    /** Set user chain id  */
    setChain: React.Dispatch<React.SetStateAction<number | null>>;
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
