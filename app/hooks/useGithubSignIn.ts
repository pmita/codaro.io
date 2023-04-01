import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from '../context/AuthenticationContext';
// FIREBASE
import { auth, firestore, githubAuthProvider } from '../firebase/config';
import { AuthActionType } from '../types/context/AuthStateContextTypes';


export const useGithubSignIn = () => {
  const { dispatch } = useAuthState();
  const router = useRouter();
  const [error, setError] = useState<Error | string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const signInWithGithub = async () => {
    setIsLoading(true);

    try{
      setIsLoading(true);
      setError(null);
      const response = await auth.signInWithPopup(githubAuthProvider);

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

      dispatch({ type: AuthActionType.SIGN_IN_WITH_GITHUB, payload: response.user });
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

  return { signInWithGithub, error, isLoading };
}