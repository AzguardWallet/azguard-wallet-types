/** Result object */
export type Result<T> = OkResult<T> | FailedResult | SkippedResult;

/** Successful result, containing returned value */
export type OkResult<T> = {
    /** Result kind */
    kind: "ok";
    /** Returned value */
    result: T;
};

/** Failed result, containing error message */
export type FailedResult = {
    /** Result kind */
    kind: "failed";
    /** Returned error */
    error: string;
};

/**
 * Skipped result, meaning that the operation was skipped
 * due to one of the previous operations in the same batch failed
 * */
export type SkippedResult = {
    /** Result kind */
    kind: "skipped";
};
