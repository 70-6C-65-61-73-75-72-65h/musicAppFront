import { Dispatch } from "react";

interface ErrorAction {
  type: any;
  error: any;
}

interface SuccssedAction {
  type: any;
  payload: any;
}

interface LogoutAction {
  type: any;
}

export type CommonAction = ErrorAction | SuccssedAction | LogoutAction;

export interface FirstArgToFetchArticlesOperation {
  errorMessage: string;
  [index: string]: any;
}

export type FunctionReturnType<
  Func extends Function,
  FuncSecParam extends CommonAction
> = Func extends (
  arg: FirstArgToFetchArticlesOperation,
  dispatch: Dispatch<FuncSecParam>
) => infer ReturnType
  ? ReturnType
  : never;

export type commonOperation<T1 extends Function, T2 extends CommonAction> = {
  (
    arg: FirstArgToFetchArticlesOperation,
    dispatch: Dispatch<T2>
  ): FunctionReturnType<T1, T2>;
};
