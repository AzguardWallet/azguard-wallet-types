import { CallAction, EncodedCallAction } from "./action";

/** Content to add authwitness for. */
export type AuthwitContent =
    | CallAuthwitContent
    | EncodedCallAuthwitContent
    | IntentAuthwitContent
    | MessageHashAuthwitContent;

/** Contract call to be authorized */
export type CallAuthwitContent = Omit<CallAction, "kind"> & {
    /** Authwit content kind */
    readonly kind: "call";
    /** Address of the caller (AztecAddress) */
    readonly caller: string;
};

/** Encoded contract call to be authorized */
export type EncodedCallAuthwitContent = Omit<EncodedCallAction, "kind"> & {
    /** Authwit content kind */
    kind: "encoded_call";
    /** Address of the caller (AztecAddress) */
    caller: string;
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
