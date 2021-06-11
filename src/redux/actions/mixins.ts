import { SetFetching } from "./../../types/redux/fetching";
import { FetchErrors } from "./../../types/redux/error";
import { AudioAction } from "./../../types/redux/audio";
import { commonOperation, CommonAction } from "./../../types/redux/operations";

import { Dispatch } from "react";
// after next run of operation discard privious operation error
// run without args to discard
export const setOperationError = (error = "") => ({
  type: FetchErrors.SET_OPERATION_ERROR,
  error,
});

export const withError =
  (message: string) =>
  async (
    operation: Function,
    dispatch: Dispatch<AudioAction>
  ): Promise<void> => {
    try {
      await operation();
    } catch (error) {
      console.log(error.message);
      console.log(error);
      dispatch(setOperationError(`${error.message || message}`));
    }
  };
export const withFetching =
  (setFetching: SetFetching) =>
  async (
    operation: Function,
    dispatch: Dispatch<AudioAction>
  ): Promise<void> => {
    setFetching(true);
    await operation();
    setFetching(false);
  };

// args could be object of arguments or operation (wrapped) function
export function createDispatchFunction(
  func: Function,
  args: any,
  dispatch: Dispatch<AudioAction>,
  extras: Function[] = []
): Promise<void> {
  if (extras.length === 0) return func(args, dispatch);
  return createDispatchFunction(
    extras.pop() as Function,
    () => func(args, dispatch),
    dispatch,
    extras
  );
}

export interface CustomWithFetchingWithErrorArgs {
  mainData?: any;
  message?: string;
  setFetching: SetFetching;
}

export async function CustomWithFetchingWithError<
  T1 extends Function,
  T2 extends CommonAction
>(operation: commonOperation<T1, T2>, args: CustomWithFetchingWithErrorArgs) {
  return async function (dispatch: Dispatch<AudioAction>) {
    return createDispatchFunction(
      operation,
      { errorMessage: args?.message || "", ...args?.mainData },
      dispatch,
      [
        withFetching(args.setFetching || (() => void 0)),
        withError("HTTP REQUEST error"),
      ]
    );
  };
}
