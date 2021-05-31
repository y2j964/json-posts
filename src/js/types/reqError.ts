interface ReqError {
  message: string;
}

const isReqError = (error: unknown): error is ReqError =>
  (error as ReqError).message !== undefined;

export { ReqError, isOfType, isReqError };
