import firebase from "firebase"

export type AuthStateType = {
  authStateHasChanged: boolean,
  user: firebase.User | null,
}

// -----Action Reducer Types-----
export enum AuthActionType {
  SIGN_UP="SIGN_UP",
  SIGN_IN_WITH_GOOGLE="SIGN_IN_WITH_GOOGLE",
  SIGN_IN_WITH_GITHUB="SIGN_IN_WITH_GITHUB",
  SIGN_IN="SIGN_IN",
  AUTH_IS_READY="AUTH_IS_READY",
  SIGN_OUT="SIGN_OUT",
}

export type SignUpActionType = {
  type: AuthActionType.SIGN_UP,
  payload: firebase.User | null
}
export type SignInWithGoogleActionType = {
  type: AuthActionType.SIGN_IN_WITH_GOOGLE,
  payload: firebase.User | null
}
export type SignInWithGithubActionType = {
  type: AuthActionType.SIGN_IN_WITH_GITHUB,
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
export type SignOutActionType = {
  type: AuthActionType.SIGN_OUT,
}

// -----Context Types-----
export type AuthStateContextType = {
  user: firebase.User | null,
  authStateHasChanged: boolean,
  dispatch: React.Dispatch<any>
}

export type AuthStateProviderType = {
  children: React.ReactNode
}