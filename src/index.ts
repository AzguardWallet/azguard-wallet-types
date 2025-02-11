import { AzguardRpcClient } from "./client";

declare global {
    interface Window {
        /**
         * Azguard Wallet accessor
         */
        azguard: {
            /**
             * Version
             */
            version: string;
            /**
             * Creates an RPC client for interaction with the Azguard Wallet
             * @returns a new instance of AzguardRpcClient
             */
            createClient: () => AzguardRpcClient;
        };
    }
}

export * from "./action";
export * from "./authwit-content";
export * from "./client";
export * from "./dapp-session";
export * from "./operation";
export * from "./result";
