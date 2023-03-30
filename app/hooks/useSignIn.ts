import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from '../context/AuthenticationContext';
// FIREBASE
import { auth } from '../firebase/config';
// TYPES
import { AuthActionType } from '../types/context/AuthStateContextTypes';

type signIn = (email: string, password: string) => void;

export const useSignIn = () => {
  const { dispatch } = useAuthState();
  const router = useRouter();
  const [error, setError] = useState<Error | string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const signIn: signIn = async (email, password) => {
    setIsLoading(true);

    try{
      setIsLoading(true);
      setError(null);
      const response = await auth.signInWithEmailAndPassword(email, password);

      if(!response.user){
        throw new Error('Something went wrong. User could not be signed in.');
      }

      dispatch({ type: AuthActionType.SIGN_IN, payload: response.user });

      if(!isCancelled){
        setIsLoading(false);
        setError(null);
        router.push('/');
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

  return { signIn, error, isLoading };
}