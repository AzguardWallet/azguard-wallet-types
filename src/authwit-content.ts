/** Content to add authwitness for. */
export type AuthwitContent =
    | CallAuthwitContent
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
