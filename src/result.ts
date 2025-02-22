/** Result object */
export type Result<T> = OkResult<T> | FailedResult | SkippedResult;

/** Successful result, containing returned value */
export type OkResult<T> = {
    /** Result status */
    status: "ok";
    /** Returned value */
    result: T;
};

/** Failed result, containing error message */
export type FailedResult = {
    /** Result status */
    status: "failed";
    /** Returned error */
    error: string;
};

/**
 * Skipped result, meaning that the operation was skipped
 * due to one of the previous operations in the same batch failed
 * */
export type SkippedResult = {
    /** Result status */
    status: "skipped";
};
