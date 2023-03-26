export type AuthStateType = {
  authStateHasChanged: boolean,
  user: any,
  isLoading: boolean,
  error: Error | string | null,
}

// -----Action Reducer Types-----
export enum AuthActionType {
  SIGN_IN_LOADING="SIGN_IN_LOADING",
  SIGN_IN_SUCCESS="SIGN_IN_SUCCESS",
  SIGN_IN_ERROR="SIGN_IN_ERROR"
}

export type SignInSuccessActionType = {
  type: AuthActionType.SIGN_IN_SUCCESS,
  payload: any
}
export type SignInLoadingActionType = {
  type: AuthActionType.SIGN_IN_LOADING,
}

export type SignInErrorActionType = {
  type: AuthActionType.SIGN_IN_ERROR,
  payload: Error | string | null
}

// -----Context Types-----
export type AuthStateContextType = {
  state: AuthStateType,
  dispatch: React.Dispatch<any>
}

export type AuthStateProviderType = {
  children: React.ReactNode
}