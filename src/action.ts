import { AuthwitContent } from "./authwit-content";

/** Action kind */
export type ActionKind =
    | "add_capsule"
    | "add_private_authwit"
    | "add_public_authwit"
    | "call"
    | "encoded_call";

/** A request to perform some action */
export type Action =
    | AddCapsuleAction
    | AddPrivateAuthwitAction
    | AddPublicAuthwitAction
    | CallAction
    | EncodedCallAction;

/** A request to add a capsule to PXE */
export type AddCapsuleAction = {
    /** Action kind */
    kind: "add_capsule";
    /** Address of the contract to add the capsule to (AztecAddress)  */
    contract: string;
    /** Storage slot to add the capsule to (Fr) */
    storageSlot: string;
    /** Capsule to be added (Fr[]) */
    capsule: string[];
};

/** A request to add an authwit for the message hash computed from the given content to PXE */
export type AddPrivateAuthwitAction = {
    /** Action kind */
    kind: "add_private_authwit";
    /** Original content from which a message hash will be comupted */
    content: AuthwitContent;
    /**
     * Authwitness to add (Fr[]).
     * If not specified, the wallet will create it.
     */
    authwit?: string[];
};

/** A request to call the AuthRegistry contract to authorize message hash computed from the given content */
export type AddPublicAuthwitAction = {
    /** Action kind */
    kind: "add_public_authwit";
    /** Original content from which a message hash will be comupted */
    content: AuthwitContent;
};

/** A request to call a contract with plain args */
export type CallAction = {
    /** Action kind */
    kind: "call";
    /** Address of the contract (AztecAddress) */
    contract: string;
    /** Name of the function */
    method: string;
    /** Arguments (unencoded) */
    args: any[];
};

/** A request to call a contract with encoded args (matches FunctionCall from aztec.js) */
export type EncodedCallAction = {
    /** Action kind */
    kind: "encoded_call";
    /** Name of the function */
    name?: string;
    /** Address of the contract (AztecAddress) */
    to: string;
    /** Selector of the function (FunctionSelector) */
    selector: string;
    /** Type of the function (FunctionType) */
    type?: string;
    /** Whether this call can makes modifications to state or not */
    isStatic?: boolean;
    /** Encoded arguments (Fr[]) */
    args: string[];
    /** Return types for decoding (AbiType[]) */
    returnTypes?: unknown[];
};
