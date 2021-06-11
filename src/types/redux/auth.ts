import { FetchError } from "./error";

// for fetching and updating
export interface AuthData {
  // all would be stored in AuthState
  name: string;
  email: string;
  password: string;
  id: string;
  publicSearchKey: string;
}

// for forms state
export interface AuthSignINCreds {
  email: string;
  password: string;
}

// for forms state
export interface AuthSignUPCreds extends AuthSignINCreds {
  firstName: string;
  lastName: string;
}

export interface AuthState {
  authData: AuthData | null;
}

export enum AuthActionTypes {
  AUTH = "AUTH",
  LOGOUT = "LOGOUT",
}

// for signIN and signUp
interface Authenticate {
  type: AuthActionTypes.AUTH;
  payload: AuthData;
}
export interface Logout {
  type: AuthActionTypes.LOGOUT;
  // payload: any; // there is no payload TODO change type
}

// type AuthOrLogout<T> = T extends Authenticate | FetchError ? T : Logout;

export type AuthAction = Authenticate | FetchError | Logout;

// export type AuthAction<T = Authenticate | FetchError | Logout> =
//   AuthOrLogout<T>;

//
//
// type ExcludeTypeKey<K> = K extends "type" ? never : K;
// type ExcludeTypeField<A> = { [K in ExcludeTypeKey<keyof A>]: A[K] };
// type ExtractActionParameters<A, T> = A extends { type: T }
//   ? ExcludeTypeField<A>
//   : never

// type ExcludeTypeField<A> = { [K in Exclude<keyof A, "type">]: A[K] };

// type ExtractActionParameters<A, T> = ExcludeTypeField<Extract<A, { type: T }>>;
