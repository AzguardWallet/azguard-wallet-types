import { ActionKind } from "./action";
import { EventKind } from "./event";
import { OperationKind } from "./operation";

/** Chain id (CAIP-2) */
export type CaipChain = `aztec:${number}`;

/** Accound address (CAIP-10) */
export type CaipAccount = `${CaipChain}:${string}`;

/** DApp metadata */
export type DappMetadata = {
    /** Name */
    name: string;
    /** Short description */
    description?: string;
    /** Logo URI */
    logo?: string;
    /** DApp URI */
    url?: string;
};

/** Permissions set */
export type DappPermissions = {
    /** List of chains */
    chains?: CaipChain[];
    /** List of methods */
    methods?: (OperationKind | ActionKind)[];
    /** List of events */
    events?: EventKind[];
};

/** Dapp session */
export type DappSession = {
    /** Id of the session */
    id: string;
    /** Approved permissions */
    permissions: DappPermissions[];
    /** Approved accounts */
    accounts: CaipAccount[];
};
