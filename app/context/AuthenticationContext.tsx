"use client"

import { createContext, useContext, useReducer } from "react"
// TYPES
import { AuthStateType, AuthStateContextType, AuthStateProviderType } from "../types/context/AuthStateContextTypes";

const initialState: AuthStateType = {
  color: 'red',
  authStateHasChanged: false,
  user: null,
  isLoading: false,
  error: null,
}

export const AuthStateContext = createContext<AuthStateContextType | null>(null);

export const AuthStateReducer = (state: AuthStateType, action: any) => {
  switch(action.type) {
    case 'TEST_ONE':
    case 'TEST_TWO':
      return { ...state };
    default:
      return { ...state };
  }
}

export const AuthStateProvider = ({ children }: AuthStateProviderType) => {
  // STATE
  const [state, dispatch] = useReducer(AuthStateReducer, initialState);
  return (
    <AuthStateContext.Provider value={{ state, dispatch }}>
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