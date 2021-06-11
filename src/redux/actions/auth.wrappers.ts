import { AuthSignINCreds, AuthSignUPCreds } from "./../../types/redux/auth";
import { SetFetching } from "../../types/redux/fetching";

import { CustomWithFetchingWithError } from "./mixins";
import { AuthData, AuthAction } from "../../types/redux/auth";
import { History } from "../../types/common";
import {
  signInOperation,
  signUpOperation,
  logoutOperation,
} from "./auth.actions";

export function signIn(
  formData: AuthSignINCreds,
  router: History,
  setFetching: SetFetching,
  message: string = `Failed sign in to site`
) {
  return CustomWithFetchingWithError<typeof signInOperation, AuthAction>(
    signInOperation,
    {
      setFetching,
      message,
      mainData: {
        formData,
        router,
      },
    }
  );
}
export function signUp(
  formData: AuthSignUPCreds,
  router: History,
  setFetching: SetFetching,
  message: string = `Failed sign up to site`
) {
  return CustomWithFetchingWithError<typeof signUpOperation, AuthAction>(
    signUpOperation,
    {
      setFetching,
      message,
      mainData: {
        formData,
        router,
      },
    }
  );
}

export function logout(
  formData: AuthSignUPCreds,
  router: History,
  setFetching: SetFetching,
  message: string = `Failed sign up to site`
) {
  return CustomWithFetchingWithError<typeof logoutOperation, AuthAction>(
    logoutOperation,
    {
      setFetching,
      message,
      mainData: {
        formData,
        router,
      },
    }
  );
}
