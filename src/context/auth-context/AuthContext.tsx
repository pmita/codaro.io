'use client'

import { createContext, useReducer, type FC, useEffect } from 'react';
import { 
  type AuthReducerInitialState, 
  AuthActionTypes,
  type AuthReducerActionsType, 
  type AuthReducerState 
} from './types';
import { saveFirebaseCookie } from '@/hooks/mutations/useSigninMutation/utils';
import { removeAuthCookie, setAuthCookie } from '@/lib/cookies';
import { getAuth, getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { app, auth } from "@/firebase/client/config";
import { createSessionCookie } from '@/data/auth/createSessionCookie';

export const AuthContext = createContext<AuthReducerState | undefined | null>(null);

const initialState: AuthReducerInitialState = {
  user: null,
  authStateHasChanged: false,
}

const reducer = (state: AuthReducerInitialState, action: AuthReducerActionsType): AuthReducerInitialState => {
  switch(action.type){
    case AuthActionTypes.SIGN_IN_SUCCESS:
    case AuthActionTypes.SIGN_UP_SUCCESS:
    case AuthActionTypes.AUTH_HAS_CHANGED_SUCCESS:
      return { ...state, user: action.payload }
    case AuthActionTypes.SIGN_OUT_SUCCESS:
      return { ...state, user: null }
    default: 
      return { ...state }
  }
}

export const AuthContextProvider: FC<{children: React.ReactNode}> = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user) {
        // await saveFirebaseCookie();
        
        const currentUser = getAuth(app).currentUser;
        if (currentUser) {
          const idToken = await getIdToken(currentUser, true);
          const sessionCookie = await createSessionCookie(idToken, {
            expiresIn: 60 * 60 * 24 * 5,
          });

          setAuthCookie(sessionCookie);
        }

        dispatch({ type: AuthActionTypes.AUTH_HAS_CHANGED_SUCCESS, payload: user })
      } else {
        removeAuthCookie();
        dispatch({ type: AuthActionTypes.SIGN_OUT_SUCCESS })
      }
    })

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};