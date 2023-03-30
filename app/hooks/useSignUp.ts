import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from '../context/AuthenticationContext';
// FIREBASE
import { auth, firestore } from '../firebase/config';
// TYPES
import { AuthActionType } from '../types/context/AuthStateContextTypes';

type signUp = (email: string, password: string, username: string) => void;

export const useSignUp = () => {
  const { dispatch } = useAuthState();
  const router = useRouter();
  const [error, setError] = useState<Error | string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const signUp: signUp = async (email, password, username) => {
    setIsLoading(true);

    try{
      setIsLoading(true);
      setError(null);
      const response = await auth.createUserWithEmailAndPassword(email, password);

      if(!response.user){
        throw new Error('Sign up process failed. User could not be created.');
      }

      await response.user.updateProfile({
        displayName: username
      })

      await firestore.collection('users').doc(response.user.uid).set({
        displayName: username,
        email,
      })

      dispatch({ type: AuthActionType.SIGN_UP, payload: response.user });

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

  return { signUp, error, isLoading };
}