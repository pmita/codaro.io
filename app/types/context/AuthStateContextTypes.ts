export type AuthStateType = {
  color: string,
  authStateHasChanged: boolean,
  user: any,
  isLoading: boolean,
  error: Error | string | null,
}

// -----Context Types-----
export type AuthStateContextType = {
  state: AuthStateType,
  dispatch: React.Dispatch<any>
}

export type AuthStateProviderType = {
  children: React.ReactNode
}