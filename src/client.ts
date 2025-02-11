import { DappMetadata, DappPermissions, DappSession } from "./dapp-session";
import { Operation, OperationResult } from "./operation";

/** Azguard RPC client for sending requests to and receiving events from the wallet */
export type AzguardRpcClient = {
    /**
     * Adds event handler for the `session_updated` event
     * @param event event name
     * @param handler event handler
     */
    on(event: "session_updated", handler: (session: DappSession) => void): void;

    /**
     * Adds event handler for the `session_closed` event
     * @param event event name
     * @param handler event handler
     */
    on(event: "session_closed", handler: (session: DappSession) => void): void;

    /**
     * Removes event handler for the `session_updated` event
     * @param event event name
     * @param handler event handler
     */
    off(event: "session_updated", handler: (session: DappSession) => void): void;

    /**
     * Removes event handler for the `session_closed` event
     * @param event event name
     * @param handler event handler
     */
    off(event: "session_closed", handler: (session: DappSession) => void): void;

    /**
     * Requests wallet info
     * @param method RPC method name
     * @returns Wallet info
     */
    request(method: "get_wallet_info"): Promise<WalletInfo>;

    /**
     * Requests session info
     * @param method RPC method name
     * @param sessionId Session id
     * @returns Dapp session or `null` if not found
     */
    request(method: "get_session", sessionId: string): Promise<DappSession | null>;

    /**
     * Requests session termination
     * @param method RPC method name
     * @param sessionId Session id
     * @returns Closed dapp session or `null` if not found
     */
    request(method: "close_session", sessionId: string): Promise<DappSession | null>;

    /**
     * Requests connection to the wallet
     * @param method RPC method name
     * @param params Connection parameters
     * @returns Created dapp session
     * @throws "User rejected" if user rejects
     */
    request(
        method: "connect",
        params: {
            /** Information about the connected DApp */
            dappMetadata: DappMetadata;
            /** Required permissions requested by the DApp */
            requiredPermissions: DappPermissions[];
            /** Optional permissions requested by the DApp */
            optionalPermissions?: DappPermissions[];
        },
    ): Promise<DappSession>;

    /**
     * Requests execution of a batch of operations
     * @param method RPC method name
     * @param params Execution parameters
     * @returns List of operation results, fully matching the list of requested operations
     * @throws "User rejected" if user rejects
     */
    request(
        method: "execute",
        params: {
            /** Id of the session */
            sessionId: string;
            /** List of operations to execute */
            operations: Operation[];
        },
    ): Promise<OperationResult[]>;
};

/** Wallet metadata */
export type WalletInfo = {
    /** Name */
    name: string;
    /** Short description */
    description: string;
    /** Logo URI */
    logo: string;
    /** Wallet URI */
    url: string;
    /** Version */
    version: string;
    /** Capabilities */
    capabilities: string[];
};
