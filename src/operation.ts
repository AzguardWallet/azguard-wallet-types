import { Action } from "./action";
import { Result } from "./result";
import { CaipAccount, CaipChain } from "./dapp-session";

/** Operation kind */
export type OperationKind =
    | "add_note"
    | "register_contract"
    | "register_sender"
    | "send_transaction"
    | "simulate_transaction"
    | "simulate_unconstrained";

/** A request to perform some operation */
export type Operation =
    | AddNoteOperation
    | RegisterContractOperation
    | RegisterSenderOperation
    | SendTransactionOperation
    | SimulateTransactionOperation
    | SimulateUnconstrainedOperation;

/** Operation result */
export type OperationResult =
    | AddNoteResult
    | RegisterContractResult
    | RegisterSenderResult
    | SendTransactionResult
    | SimulateTransactionResult
    | SimulateUnconstrainedResult;

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
export type AddNoteResult = Result<void>;

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
export type RegisterContractResult = Result<void>;

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
export type RegisterSenderResult = Result<void>;

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
export type SendTransactionResult = Result<string>;

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

/** Wrapped simulation results */
export type SimulationReturn = {
    /** Gas usage info (GasUsed) */
    gasUsed: unknown;
    /** Private return values (NestedProcessReturnValues) */
    privateReturn: unknown;
    /** Public return values (NestedProcessReturnValues[]) */
    publicReturn: unknown[];
};

/** A result of the "simulate_transaction" operation */
export type SimulateTransactionResult = Result<SimulationReturn>;

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
export type SimulateUnconstrainedResult = Result<unknown>;
