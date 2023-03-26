"use client"

import { createContext, useContext, useReducer } from "react"

export type AuthStateContextType = {
  color?: string
}

export type AuthStateProviderType = {
  children: React.ReactNode
}

export const AuthStateContext = createContext<AuthStateContextType | null>(null);

export const AuthStateProvider = ({ children }: AuthStateProviderType) => {
  return (
    <AuthStateContext.Provider value={{ color: 'blue' }}>
      {children}
    </AuthStateContext.Provider>
  );
}

export const useAuthState = () => {
  const authStateContext = useContext(AuthStateContext);

  if (!authStateContext) {
    throw new Error('useAuthState must be used within a AuthStateProvider. Check your component is included in this context')
  }

  return authStateContext;
}