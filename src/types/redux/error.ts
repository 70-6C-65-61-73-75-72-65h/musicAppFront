export enum FetchErrors {
  SET_OPERATION_ERROR = "SET_OPERATION_ERROR",
}

export interface FetchError {
  type: FetchErrors.SET_OPERATION_ERROR;
  error: string; //should define in the future
}
