import { Action, CallAction, EncodedCallAction } from "./action";
import { Result } from "./result";
import { CaipAccount, CaipChain } from "./dapp-session";

/** Operation kind */
export type OperationKind =
    | "add_note"
    | "get_complete_address"
    | "register_contract"
    | "register_sender"
    | "send_transaction"
    | "simulate_transaction"
    | "simulate_unconstrained"
    | "simulate_views";

/** A request to perform some operation */
export type Operation =
    | AddNoteOperation
    | GetCompleteAddressOperation
    | RegisterContractOperation
    | RegisterSenderOperation
    | SendTransactionOperation
    | SimulateTransactionOperation
    | SimulateUnconstrainedOperation
    | SimulateViewsOperation;

/** Operation result */
export type OperationResult =
    | Result<AddNoteResult>
    | Result<GetCompleteAddressResult>
    | Result<RegisterContractResult>
    | Result<RegisterSenderResult>
    | Result<SendTransactionResult>
    | Result<SimulateTransactionResult>
    | Result<SimulateUnconstrainedResult>
    | Result<SimulateViewsResult>;

/** A request to add a note to PXE */
export type AddNoteOperation = {
    /** Operation kind */
    kind: "add_note";
    /** Account to add the note for */
    account: CaipAccount;
    /** Note to add (ExtendedNote) */
    note: unknown;
};

/** A result of the "add_note" operation */
export type AddNoteResult = void;

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

/** A request to simulate the unconstrained function */
export type SimulateUnconstrainedOperation = {
    /** Operation kind */
    kind: "simulate_unconstrained";
    /** Address of the account to simulate for */
    account: CaipAccount;
    /** Address of the contract (AztecAddress) */
    contract: string;
    /** Name of the function */
    method: string;
    /** Arguments (unencoded) */
    args: any[];
};

/** A result of the "simulate_unconstrained" operation (AbiDecoded) */
export type SimulateUnconstrainedResult = unknown;

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
