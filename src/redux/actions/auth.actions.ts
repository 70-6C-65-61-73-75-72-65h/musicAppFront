import { setOperationError } from "./mixins";
import { FirstArgToFetchArticlesOperation } from "./../../types/redux/operations";
import * as api from "./../../service/api";
import {
  AuthAction,
  AuthActionTypes,
  AuthData,
  Logout,
} from "./../../types/redux/auth";
import { Dispatch } from "react";
import { AxiosResponse } from "axios";

export const signInOperation = async (
  { errorMessage, formData, router }: FirstArgToFetchArticlesOperation,
  dispatch: Dispatch<AuthAction>
) => {
  const { data }: AxiosResponse<AuthData> = await api.signIn(formData);
  if (data) {
    dispatch({ type: AuthActionTypes.AUTH, payload: data });
    router.push("/");
  } else {
    dispatch(setOperationError(errorMessage));
  }
};

export const signUpOperation = async (
  { errorMessage, formData, router }: FirstArgToFetchArticlesOperation,
  dispatch: Dispatch<AuthAction>
) => {
  const { data }: AxiosResponse<AuthData> = await api.signUp(formData);
  if (data) {
    dispatch({ type: AuthActionTypes.AUTH, payload: data });
    router.push("/");
  } else {
    dispatch(setOperationError(errorMessage));
  }
};

export const logoutOperation = async (
  { router }: FirstArgToFetchArticlesOperation,
  dispatch: Dispatch<AuthAction>
) => {
  dispatch({ type: AuthActionTypes.LOGOUT });
  router.push("/");
};
