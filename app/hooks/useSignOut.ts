import { useEffect, useState } from 'react';
import { useAuthState } from '../context/AuthenticationContext';
// FIREBASE
import { auth } from '../firebase/config';
// TYPES
import { AuthActionType } from '../types/context/AuthStateContextTypes';

type signOut = (email: string, password: string, username: string) => void;

export const useSignOut = () => {
  const { dispatch } = useAuthState();
  const [error, setError] = useState<Error | string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const signOut: signOut = async () => {
    setIsLoading(true);

    try{
      setIsLoading(true);
      setError(null);
      await auth.signOut();

      dispatch({ type: AuthActionType.SIGN_OUT });

      if(!isCancelled){
        setIsLoading(false);
        setError(null);
      }
    }catch(error){
      if(!isCancelled){
        setIsLoading(false);
        setError((error as Error).message);
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signOut, error, isLoading };
}