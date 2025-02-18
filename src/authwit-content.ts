/** Content to add authwitness for. */
export type AuthwitContent =
    | CallAuthwitContent
    | EncodedCallAuthwitContent
    | IntentAuthwitContent
    | MessageHashAuthwitContent;

/** Contract call to be authorized */
export type CallAuthwitContent = {
    /** Authwit content kind */
    kind: "call";
    /** Address of the caller (AztecAddress) */
    caller: string;
    /** Address of the contract (AztecAddress) */
    contract: string;
    /** Name of the function */
    method: string;
    /** Arguments (unencoded) */
    args: any[];
};

/** Encoded contract call to be authorized */
export type EncodedCallAuthwitContent = {
    /** Authwit content kind */
    kind: "encoded_call";
    /** Address of the caller (AztecAddress) */
    caller: string;
    /** Name of the function */
    name: string;
    /** Address of the contract (AztecAddress) */
    to: string;
    /** Selector of the function (FunctionSelector) */
    selector: string;
    /** Type of the function (FunctionType) */
    type: string;
    /** Whether this call can makes modifications to state or not */
    isStatic: boolean;
    /** Encoded arguments (Fr[]) */
    args: string[];
    /** Return types for decoding (AbiType[]) */
    returnTypes: unknown[];
};

/** Arbitrary intent to be authorized */
export type IntentAuthwitContent = {
    /** Authwit content kind */
    kind: "intent";
    /** Address of the authwitness consumer (AztecAddress) */
    consumer: string;
    /** Intent (Fr[]) */
    intent: string[];
};

/** Message hash to be authorized */
export type MessageHashAuthwitContent = {
    /** Authwit content kind */
    kind: "message_hash";
    /** Message hash (Fr) */
    messageHash: string;
};
