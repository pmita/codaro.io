import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from '../context/AuthenticationContext';
// FIREBASE
import { auth, firestore, googleAuthProvider, githubAuthProvider } from '../firebase/config';
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

      await firestore.collection('users').doc(response.user.uid).set({
        displayName: response.user.displayName,
        email: response.user.email,
      })

      dispatch({ type: AuthActionType.SIGN_IN, payload: response.user });
      
      if(!isCancelled){
        setIsLoading(false);
        setError(null);
      }

      router.push('/');
    }catch(error){
      if(!isCancelled){
        setIsLoading(false);
        setError((error as Error).message);
      }
    }
  }

  // ---------Signin with Google---------
  const signInWithGoogle = async () => {
    /*
      Since we are signing the user in with a popup there is
      no need keeping track of the loading state.
    */
    try{
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

      dispatch({ type: AuthActionType.SIGN_IN_WITH_GOOGLE, payload: response.user });
      
      if(!isCancelled){
        setError(null);
      }
      
      router.push('/');
    }catch(error){
      if(!isCancelled){
        setError((error as Error).message);
      }
    }
  }

  // ---------Signin with Github---------
  const signInWithGithub = async () => {
    // Same here, no need for loading state

    try{
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
      
      if(!isCancelled){
        setError(null);
      }

      router.push('/');
    }catch(error){
      if(!isCancelled){
        setError((error as Error).message);
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signIn, signInWithGoogle, signInWithGithub, error, isLoading };
}