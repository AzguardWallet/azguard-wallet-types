import { Action, CallAction, EncodedCallAction } from "./action";
import { Result } from "./result";
import { CaipAccount, CaipChain } from "./dapp-session";

/** Operation kind */
export type OperationKind = Operation["kind"];

/** A request to perform some operation */
export type Operation =
    // Azguard base:
    | GetCompleteAddressOperation
    | RegisterContractOperation
    | RegisterSenderOperation
    | RegisterTokenOperation
    | SendTransactionOperation
    | SimulateTransactionOperation
    | SimulateUtilityOperation
    | SimulateViewsOperation
    // Aztec.js PXE:
    | AztecSimulateTxOperation
    | AztecSimulateUtilityOperation
    | AztecProfileTxOperation
    | AztecSendTxOperation
    | AztecGetContractClassMetadataOperation
    | AztecGetContractMetadataOperation
    | AztecRegisterContractOperation
    | AztecRegisterContractClassOperation
    | AztecProveTxOperation
    | AztecGetNodeInfoOperation
    | AztecGetPXEInfoOperation
    | AztecGetCurrentBaseFeesOperation
    | AztecUpdateContractOperation
    | AztecRegisterSenderOperation
    | AztecGetSendersOperation
    | AztecRemoveSenderOperation
    | AztecGetTxReceiptOperation
    | AztecGetPrivateEventsOperation
    | AztecGetPublicEventsOperation
    // Aztec.js AccountInterface:
    | AztecGetCompleteAddressOperation
    | AztecGetAddressOperation
    | AztecGetChainIdOperation
    | AztecGetVersionOperation
    // Aztec.js EntrypointInterface:
    | AztecCreateTxExecutionRequestOperation
    // Aztec.js AuthWitnessProvider:
    | AztecCreateAuthWitOperation;

/** Operation result */
export type OperationResult =
    // Azguard base:
    | Result<GetCompleteAddressResult>
    | Result<RegisterContractResult>
    | Result<RegisterSenderResult>
    | Result<RegisterTokenResult>
    | Result<SendTransactionResult>
    | Result<SimulateTransactionResult>
    | Result<SimulateUtilityResult>
    | Result<SimulateViewsResult>
    // Aztec.js PXE:
    | Result<AztecSimulateTxResult>
    | Result<AztecSimulateUtilityResult>
    | Result<AztecProfileTxResult>
    | Result<AztecSendTxResult>
    | Result<AztecGetContractClassMetadataResult>
    | Result<AztecGetContractMetadataResult>
    | Result<AztecRegisterContractResult>
    | Result<AztecRegisterContractClassResult>
    | Result<AztecProveTxResult>
    | Result<AztecGetNodeInfoResult>
    | Result<AztecGetPXEInfoResult>
    | Result<AztecGetCurrentBaseFeesResult>
    | Result<AztecUpdateContractResult>
    | Result<AztecRegisterSenderResult>
    | Result<AztecGetSendersResult>
    | Result<AztecRemoveSenderResult>
    | Result<AztecGetTxReceiptResult>
    | Result<AztecGetPrivateEventsResult>
    | Result<AztecGetPublicEventsResult>
    // Aztec.js AccountInterface:
    | Result<AztecGetCompleteAddressResult>
    | Result<AztecGetAddressResult>
    | Result<AztecGetChainIdResult>
    | Result<AztecGetVersionResult>
    // Aztec.js EntrypointInterface:
    | Result<AztecCreateTxExecutionRequestResult>
    // Aztec.js AuthWitnessProvider:
    | Result<AztecCreateAuthWitResult>;

// Azguard base:

/** A request to get complete address of the specified account */
export type GetCompleteAddressOperation = {
    /** Operation kind */
    kind: "get_complete_address";
    /** Account to get complete address of */
    account: CaipAccount;
};

/** A result of the "get_complete_address" operation (CompleteAddress) */
export type GetCompleteAddressResult = unknown;

/** A request to register contract in PXE */
export type RegisterContractOperation = {
    /** Operation kind */
    kind: "register_contract";
    /** Chain to register the contract for */
    chain: CaipChain;
    /** Address of the contract (AztecAddress) */
    address: string;
    /**
     * Contract instance (ContractInstanceWithAddress).
     * If not specified, the wallet will try to fetch it from PXE/node.
     */
    instance?: unknown;
    /**
     * Contract artifact (ContractArtifact).
     * If not specified, the wallet will try to fetch it from PXE/node.
     */
    artifact?: unknown;
};

/** A result of the "register_contract" operation */
export type RegisterContractResult = void;

/** A request to register sender in PXE */
export type RegisterSenderOperation = {
    /** Operation kind */
    kind: "register_sender";
    /** Chain to register the sender for */
    chain: CaipChain;
    /** Address of the sender (AztecAddress) */
    address: string;
};

/** A result of the "register_sender" operation */
export type RegisterSenderResult = void;

/** A request to import the token into the wallet */
export type RegisterTokenOperation = {
    /** Operation kind */
    kind: "register_token";
    /** Address of the account to add the token for */
    account: CaipAccount;
    /** Address of the token contract (AztecAddress) */
    address: string;
};

/** A result of the "register_token" operation */
export type RegisterTokenResult = Result<void>;

/** A request to send the transaction */
export type SendTransactionOperation = {
    /** Operation kind */
    kind: "send_transaction";
    /** Address of the account to send transaction from */
    account: CaipAccount;
    /**
     * Batch of calls to be passed to the account contract for the "execution" phase
     * and additional actions, that may be needed for its execution
     * */
    actions: Action[];
    /**
     * Batch of calls to be passed to the account contract for the "setup" phase
     * and additional actions, that may be needed for its execution
     * */
    setup?: Action[];
};

/** A result of the "send_transaction" operation (TxHash) */
export type SendTransactionResult = string;

/** A request to simulate the transaction */
export type SimulateTransactionOperation = {
    /** Operation kind */
    kind: "simulate_transaction";
    /** Address of the account to send transaction from */
    account: CaipAccount;
    /**
     * Batch of calls to be passed to the account contract for the "execution" phase
     * and additional actions, that may be needed for its execution
     * */
    actions: Action[];
    /**
     * Batch of calls to be passed to the account contract for the "setup" phase
     * and additional actions, that may be needed for its execution
     * */
    setup?: Action[];
    /** Whether to also simulate enqueued public calls or not */
    simulatePublic?: boolean;
};

/** A result of the "simulate_transaction" operation */
export type SimulateTransactionResult = {
    /** Gas usage info (GasUsed) */
    gasUsed: unknown;
    /** Private return values (NestedProcessReturnValues) */
    privateReturn: unknown;
    /** Public return values (NestedProcessReturnValues[]) */
    publicReturn: unknown[];
};

/** A request to simulate the utility function */
export type SimulateUtilityOperation = {
    /** Operation kind */
    kind: "simulate_utility";
    /** Address of the account to simulate for */
    account: CaipAccount;
    /** Address of the contract (AztecAddress) */
    contract: string;
    /** Name of the function */
    method: string;
    /** Arguments (unencoded) */
    args: any[];
};

/** A result of the "simulate_utility" operation (AbiDecoded) */
export type SimulateUtilityResult = unknown;

/** A request to simulate the batch of view calls */
export type SimulateViewsOperation = {
    /** Operation kind */
    kind: "simulate_views";
    /** Address of the account to simulate for */
    account: CaipAccount;
    /** Batch of view calls to simulate */
    calls: (CallAction | EncodedCallAction)[];
};

/** A result of the "simulate_views" operation */
export type SimulateViewsResult = {
    /** List of results, encoded with function return types ABI (Fr[][]) */
    encoded: string[][];
    /** List of results, decoded with function return types ABI (AbiDecoded[]) */
    decoded: unknown[];
};

// Aztec.js PXE:

/** Aztec.js Wallet request */
export type AztecSimulateTxOperation = {
    /** Operation kind */
    kind: "aztec_simulateTx";
    /** Chain to execute PXE request for */
    chain: CaipChain;
    /** An authenticated tx request ready for simulation (TxExecutionRequest) */
    txRequest: unknown;
    /** Whether to simulate the public part of the transaction */
    simulatePublic: boolean;
    /** (Optional) If false, this function throws if the transaction is unable to be included in a block at the current state */
    skipTxValidation?: boolean;
    /** (Optional) If false, fees are enforced */
    skipFeeEnforcement?: boolean;
    /** (Optional) State overrides for the simulation, such as msgSender, contract instances and artifacts (SimulationOverrides) */
    overrides?: unknown;
    /** (Optional) The accounts whose notes we can access in this call. Currently optional and will default to all (AztecAddress[]) */
    scopes?: unknown[];
};

/** A result of the "aztec_simulateTx" operation (TxSimulationResult) */
export type AztecSimulateTxResult = unknown;

/** Aztec.js Wallet request */
export type AztecSimulateUtilityOperation = {
    /** Operation kind */
    kind: "aztec_simulateUtility";
    /** Chain to execute PXE request for */
    chain: CaipChain;
    /** The name of the utility contract function to be called */
    functionName: string;
    /** The arguments to be provided to the function */
    args: any[];
    /** The address of the contract to be called (AztecAddress) */
    to: unknown;
    /** (Optional) The authentication witnesses required for the function call (AuthWitness[]) */
    authwits?: unknown[];
    /** (Optional) The msg sender to set for the call (AztecAddress) */
    from?: unknown;
    /** (Optional) The accounts whose notes we can access in this call. Currently optional and will default to all (AztecAddress[]) */
    scopes?: unknown[];
};

/** A result of the "aztec_simulateUtility" operation (UtilitySimulationResult) */
export type AztecSimulateUtilityResult = unknown;

/** Aztec.js Wallet request */
export type AztecProfileTxOperation = {
    /** Operation kind */
    kind: "aztec_profileTx";
    /** Chain to execute PXE request for */
    chain: CaipChain;
    /** An authenticated tx request ready for simulation (TxExecutionRequest) */
    txRequest: unknown;
    /** Profile mode */
    profileMode: "gates" | "execution-steps" | "full";
    /** (Optional) The message sender to use for the simulation */
    skipProofGeneration?: boolean;
    /** (Optional) If false, this function throws if the transaction is unable to be included in a block at the current state (AztecAddress) */
    msgSender?: unknown;
};

/** A result of the "aztec_profileTx" operation (TxProfileResult) */
export type AztecProfileTxResult = unknown;

/** Aztec.js Wallet request */
export type AztecSendTxOperation = {
    /** Operation kind */
    kind: "aztec_sendTx";
    /** Chain to execute PXE request for */
    chain: CaipChain;
    /** The transaction as created via `proveTx` (Tx) */
    tx: unknown;
};

/** A result of the "aztec_sendTx" operation (TxHash) */
export type AztecSendTxResult = unknown;

/** Aztec.js Wallet request */
export type AztecGetContractClassMetadataOperation = {
    /** Operation kind */
    kind: "aztec_getContractClassMetadata";
    /** Chain to execute PXE request for */
    chain: CaipChain;
    /** Identifier of the class (Fr) */
    id: unknown;
    /** Whether or not to also return contract artifact */
    includeArtifact?: boolean;
};

/** A result of the "aztec_getContractClassMetadata" operation (ContractClassMetadata) */
export type AztecGetContractClassMetadataResult = unknown;

/** Aztec.js Wallet request */
export type AztecGetContractMetadataOperation = {
    /** Operation kind */
    kind: "aztec_getContractMetadata";
    /** Chain to execute PXE request for */
    chain: CaipChain;
    /** The address that the contract instance resides at (AztecAddress) */
    address: unknown;
};

/** A result of the "aztec_getContractMetadata" operation (ContractMetadata) */
export type AztecGetContractMetadataResult = unknown;

/** Aztec.js Wallet request */
export type AztecRegisterContractOperation = {
    /** Operation kind */
    kind: "aztec_registerContract";
    /** Chain to execute PXE request for */
    chain: CaipChain;
    /** A contract instance to register, with an optional artifact which can be omitted if the contract class has already been registered */
    contract: {
        /** Contract instance (ContractInstanceWithAddress) */
        instance: unknown;
        /** Contract artifact (ContractArtifact) */
        artifact?: unknown;
    };
};

/** A result of the "aztec_registerContract" operation */
export type AztecRegisterContractResult = void;

/** Aztec.js Wallet request */
export type AztecRegisterContractClassOperation = {
    /** Operation kind */
    kind: "aztec_registerContractClass";
    /** Chain to execute PXE request for */
    chain: CaipChain;
    /** The build artifact for the contract class (ContractArtifact) */
    artifact: unknown;
};

/** A result of the "aztec_registerContractClass" operation */
export type AztecRegisterContractClassResult = void;

/** Aztec.js Wallet request */
export type AztecProveTxOperation = {
    /** Operation kind */
    kind: "aztec_proveTx";
    /** Chain to execute PXE request for */
    chain: CaipChain;
    /** An authenticated tx request ready for simulation (TxExecutionRequest) */
    txRequest: unknown;
    /** (Optional) The result of the private execution of the transaction. The txRequest will be executed if not provided (PrivateExecutionResult) */
    privateExecutionResult?: unknown;
};

/** A result of the "aztec_proveTx" operation (TxProvingResult) */
export type AztecProveTxResult = unknown;

/** Aztec.js Wallet request */
export type AztecGetNodeInfoOperation = {
    /** Operation kind */
    kind: "aztec_getNodeInfo";
    /** Chain to execute PXE request for */
    chain: CaipChain;
};

/** A result of the "aztec_getNodeInfo" operation (NodeInfo) */
export type AztecGetNodeInfoResult = unknown;

/** Aztec.js Wallet request */
export type AztecGetPXEInfoOperation = {
    /** Operation kind */
    kind: "aztec_getPXEInfo";
    /** Chain to execute PXE request for */
    chain: CaipChain;
};

/** A result of the "aztec_getPXEInfo" operation (PXEInfo) */
export type AztecGetPXEInfoResult = unknown;

/** Aztec.js Wallet request */
export type AztecGetCurrentBaseFeesOperation = {
    /** Operation kind */
    kind: "aztec_getCurrentBaseFees";
    /** Chain to execute PXE request for */
    chain: CaipChain;
};

/** A result of the "aztec_getCurrentBaseFees" operation (GasFees) */
export type AztecGetCurrentBaseFeesResult = unknown;

/** Aztec.js Wallet request */
export type AztecUpdateContractOperation = {
    /** Operation kind */
    kind: "aztec_updateContract";
    /** Chain to execute PXE request for */
    chain: CaipChain;
    /** The address of the contract to update (AztecAddress) */
    contractAddress: unknown;
    /** The updated artifact for the contract (ContractArtifact) */
    artifact: unknown;
};

/** A result of the "aztec_updateContract" operation */
export type AztecUpdateContractResult = void;

/** Aztec.js Wallet request */
export type AztecRegisterSenderOperation = {
    /** Operation kind */
    kind: "aztec_registerSender";
    /** Chain to execute PXE request for */
    chain: CaipChain;
    /** Address of the user to add to the address book (AztecAddress) */
    address: unknown;
};

/** A result of the "aztec_registerSender" operation (AztecAddress) */
export type AztecRegisterSenderResult = unknown;

/** Aztec.js Wallet request */
export type AztecGetSendersOperation = {
    /** Operation kind */
    kind: "aztec_getSenders";
    /** Chain to execute PXE request for */
    chain: CaipChain;
};

/** A result of the "aztec_getSenders" operation (AztecAddress[]) */
export type AztecGetSendersResult = unknown;

/** Aztec.js Wallet request */
export type AztecRemoveSenderOperation = {
    /** Operation kind */
    kind: "aztec_removeSender";
    /** Chain to execute PXE request for */
    chain: CaipChain;
    /** Address of the user to remove from the address book (AztecAddress) */
    address: unknown;
};

/** A result of the "aztec_removeSender" operation */
export type AztecRemoveSenderResult = void;

/** Aztec.js Wallet request */
export type AztecGetTxReceiptOperation = {
    /** Operation kind */
    kind: "aztec_getTxReceipt";
    /** Chain to execute PXE request for */
    chain: CaipChain;
    /** The transaction hash (TxHash) */
    txHash: unknown;
};

/** A result of the "aztec_getTxReceipt" operation (TxReceipt) */
export type AztecGetTxReceiptResult = unknown;

/** Aztec.js Wallet request */
export type AztecGetPrivateEventsOperation = {
    /** Operation kind */
    kind: "aztec_getPrivateEvents";
    /** Chain to execute PXE request for */
    chain: CaipChain;
    /** The address of the contract to get events from (AztecAddress) */
    contractAddress: unknown;
    /** Metadata of the event. This should be the class generated from the contract. e.g. Contract.events.Event (EventMetadataDefinition) */
    eventMetadata: unknown;
    /** The block number to search from */
    from: number;
    /** The amount of blocks to search */
    numBlocks: number;
    /** The addresses that decrypted the logs (AztecAddress[]) */
    recipients: unknown[];
};

/** A result of the "aztec_getPrivateEvents" operation (T[]) */
export type AztecGetPrivateEventsResult = unknown;

/** Aztec.js Wallet request */
export type AztecGetPublicEventsOperation = {
    /** Operation kind */
    kind: "aztec_getPublicEvents";
    /** Chain to execute PXE request for */
    chain: CaipChain;
    /** Metadata of the event. This should be the class generated from the contract. e.g. Contract.events.Event (EventMetadataDefinition) */
    eventMetadata: unknown;
    /** The block number to search from */
    from: number;
    /** The amount of blocks to search */
    limit: number;
};

/** A result of the "aztec_getPublicEvents" operation (T[]) */
export type AztecGetPublicEventsResult = unknown;

// Aztec.js AccountInterface:

/** Aztec.js Wallet request */
export type AztecGetCompleteAddressOperation = {
    /** Operation kind */
    kind: "aztec_getCompleteAddress";
    /** Address of the account */
    account: CaipAccount;
};

/** A result of the "aztec_getCompleteAddress" operation (CompleteAddress) */
export type AztecGetCompleteAddressResult = unknown;

/** Aztec.js Wallet request */
export type AztecGetAddressOperation = {
    /** Operation kind */
    kind: "aztec_getAddress";
    /** Address of the account ¯\_(ツ)_/¯ */
    account: CaipAccount;
};

/** A result of the "aztec_getAddress" operation (AztecAddress) */
export type AztecGetAddressResult = unknown;

/** Aztec.js Wallet request */
export type AztecGetChainIdOperation = {
    /** Operation kind */
    kind: "aztec_getChainId";
    /** Chain to execute PXE request for */
    chain: CaipChain;
};

/** A result of the "aztec_getChainId" operation (Fr) */
export type AztecGetChainIdResult = unknown;

/** Aztec.js Wallet request */
export type AztecGetVersionOperation = {
    /** Operation kind */
    kind: "aztec_getVersion";
    /** Chain to execute PXE request for */
    chain: CaipChain;
};

/** A result of the "aztec_getVersion" operation (Fr) */
export type AztecGetVersionResult = unknown;

// Aztec.js EntrypointInterface:

/** Aztec.js Wallet request */
export type AztecCreateTxExecutionRequestOperation = {
    /** Operation kind */
    kind: "aztec_createTxExecutionRequest";
    /** Address of the account to create tx request for */
    account: CaipAccount;
    /** Execution payload (ExecutionPayload) */
    exec: unknown;
    /** Fee options */
    fee: FeeOptionsDto;
    /** Execution options (TxExecutionOptions) */
    options: unknown;
};

/** Transferrable version of FeeOptions */
export type FeeOptionsDto = {
    /** Fee payment method */
    paymentMethod: FeePaymentMethodDto;
    /** Gas settings (GasSettings) */
    gasSettings: unknown;
};

/** Transferrable version of FeePaymentMethod */
export type FeePaymentMethodDto = {
    /** Address of the assset contract (AztecAddress) */
    asset?: unknown;
    /** Execution payload (ExecutionPayload) */
    executionPayload: unknown;
    /** Address of the fee payer (AztecAddress) */
    feePayer: unknown;
};

/** A result of the "aztec_createTxExecutionRequest" operation (TxExecutionRequest) */
export type AztecCreateTxExecutionRequestResult = unknown;

// Aztec.js AuthWitnessProvider:

/** Aztec.js Wallet request */
export type AztecCreateAuthWitOperation = {
    /** Operation kind */
    kind: "aztec_createAuthWit";
    /** Address of the account to create authwit for */
    account: CaipAccount;
    /** Intent or message hash (Fr) */
    messageHashOrIntent: unknown | IntentInnerHashDto | IntentActionDto;
};

/** Transferrable version of IntentInnerHash */
export type IntentInnerHashDto = {
    /** Address of the authwit consumer (AztecAddress) */
    consumer: unknown;
    /** Intent hash (Fr) */
    innerHash: unknown;
};

/** Transferrable version of IntentAction */
export type IntentActionDto = {
    /** Address of the caller (AztecAddress) */
    caller: unknown;
    /** Function call (FunctionCall) */
    action: unknown;
};

/** A result of the "aztec_createAuthWit" operation (AuthWitness) */
export type AztecCreateAuthWitResult = unknown;
