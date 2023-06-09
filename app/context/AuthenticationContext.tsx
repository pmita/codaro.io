"use client"

import { createContext, useContext, useReducer, useEffect } from "react"
// FIREBASE
import { auth } from "../firebase/config";
// TYPES
import { 
  AuthStateType, 
  AuthStateContextType, 
  AuthStateProviderType, 
  AuthActionType, 
  SignUpActionType,
  SignInWithGoogleActionType,
  SignInWithGithubActionType,
  SignOutActionType,
  SignInActionType,
  AuthIsReadyActionType
} from "../types/context/AuthStateContextTypes";

const initialState: AuthStateType = {
  authStateHasChanged: false,
  user: null,
}

export const AuthStateContext = createContext<AuthStateContextType | null>(null);

export const AuthStateReducer = (
  state: AuthStateType, 
  action: SignUpActionType | SignOutActionType | SignInActionType | 
  AuthIsReadyActionType | SignInWithGoogleActionType | SignInWithGithubActionType
) => {
  switch(action.type) {
    case AuthActionType.SIGN_UP:
    case AuthActionType.SIGN_IN_WITH_GOOGLE:
    case AuthActionType.SIGN_IN_WITH_GITHUB:
    case AuthActionType.SIGN_IN:
    case AuthActionType.AUTH_IS_READY:
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user) {
        dispatch({ type: AuthActionType.AUTH_IS_READY, payload: user });
      }
    })

    return () => unsubscribe();
  }, []);

  return (
    <AuthStateContext.Provider value={{ ...state, dispatch }}>
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