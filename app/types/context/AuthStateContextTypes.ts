import firebase from "firebase"

export type AuthStateType = {
  authStateHasChanged: boolean,
  user: firebase.User | null,
}

// -----Action Reducer Types-----
export enum AuthActionType {
  SIGN_IN_LOADING="SIGN_IN_LOADING",
  SIGN_IN_SUCCESS="SIGN_IN_SUCCESS",
  SIGN_IN_ERROR="SIGN_IN_ERROR",
  SIGN_UP="SIGN_UP",
  SIGN_IN="SIGN_IN",
  AUTH_IS_READY="AUTH_IS_READY",
}

export type SignUpActionType = {
  type: AuthActionType.SIGN_UP,
  payload: firebase.User | null
}
export type SignInActionType = {
  type: AuthActionType.SIGN_IN,
  payload: firebase.User | null
}
export type AuthIsReadyActionType = {
  type: AuthActionType.AUTH_IS_READY,
  payload: firebase.User | null
}

// -----Context Types-----
export type AuthStateContextType = {
  state: AuthStateType,
  dispatch: React.Dispatch<any>
}

export type AuthStateProviderType = {
  children: React.ReactNode
}