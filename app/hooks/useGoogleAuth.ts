import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from '../context/AuthenticationContext';
// FIREBASE
import { auth, firestore, googleAuthProvider } from '../firebase/config';
import { AuthActionType } from '../types/context/AuthStateContextTypes';


export const useGoogleAuth = () => {
  const { dispatch } = useAuthState();
  const router = useRouter();
  const [error, setError] = useState<Error | string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const signInWithGoogle = async () => {
    setIsLoading(true);

    try{
      setIsLoading(true);
      setError(null);
      const response = await auth.signInWithPopup(googleAuthProvider);

      if(!response.user){
        throw new Error('Sign up with google failed. User could not be created.');
      }

      await response.user.updateProfile({
        displayName: response.user.displayName
      })

      await firestore.collection('users').doc(response.user.uid).set({
        displayName: response.user.displayName,
        email: response.user.email,
      })

      dispatch({ type: AuthActionType.SIGN_UP_WITH_GOOGLE, payload: response.user });
      router.push('/');

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

  return { signInWithGoogle, error, isLoading };
}