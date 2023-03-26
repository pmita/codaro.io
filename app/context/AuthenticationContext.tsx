"use client"

import { createContext, useContext, useReducer } from "react"
// TYPES
import { 
  AuthStateType, 
  AuthStateContextType, 
  AuthStateProviderType, 
  AuthActionType, 
  SignInSuccessActionType, 
  SignInLoadingActionType, 
  SignInErrorActionType 
} from "../types/context/AuthStateContextTypes";

const initialState: AuthStateType = {
  authStateHasChanged: false,
  user: null,
  isLoading: false,
  error: null,
}

export const AuthStateContext = createContext<AuthStateContextType | null>(null);

export const AuthStateReducer = (
  state: AuthStateType, 
  action: SignInSuccessActionType | SignInLoadingActionType | SignInErrorActionType
) => {
  switch(action.type) {
    case AuthActionType.SIGN_IN_LOADING:
      return { ...state, isLoading: true, user: null, error: null };
    case AuthActionType.SIGN_IN_ERROR:
      return { ...state, isLoading: false, user: null, error: action.payload };
    case AuthActionType.SIGN_IN_SUCCESS:
      return { ...state, isLoading: false, user: action.payload, error: null };
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