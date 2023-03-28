"use client"

import { createContext, useContext, useReducer } from "react"
// TYPES
import { 
  AuthStateType, 
  AuthStateContextType, 
  AuthStateProviderType, 
  AuthActionType, 
  SignUpActionType,
  SignOutActionType
} from "../types/context/AuthStateContextTypes";

const initialState: AuthStateType = {
  authStateHasChanged: false,
  user: null,
}

export const AuthStateContext = createContext<AuthStateContextType | null>(null);

export const AuthStateReducer = (
  state: AuthStateType, 
  action: SignUpActionType | SignOutActionType
) => {
  switch(action.type) {
    case AuthActionType.SIGN_UP:
      return { ...state, user: action.payload };
    case AuthActionType.SIGN_OUT:
      return { ...state, user: null };
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