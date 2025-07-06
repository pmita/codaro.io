// PACKAGES
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// HOOKS
import { useAuth } from "../../useAuth";
// LIB
import { showErrorToast } from "@/lib/toasts";
// FIREBASE
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/client/config";
// types
import { AuthActionTypes } from "@/context/auth-context/types";


export const useMagicLinkMutation = () => {
    const { dispatch } = useAuth();

    return useMutation({
      mutationKey: ['signin'],
      mutationFn: async ({ email }: { email: string }) => {
        try {
          await sendSignInLinkToEmail(auth, email, {
            url: process.env.NEXT_MAGIC_LINK_AUTH_REDIRECT_URL || 'http://localhost:3000/verify-magic-link', // replace with your app's URL
            handleCodeInApp: true,
          });

          window.localStorage.setItem('emailForSignIn', email);

        } catch(error) {
          throw new Error(`Failed to sign in: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      },
      onSuccess: () => {
        // we can re-direct user to dashboard after we ensure the session cokoie exists 
        // router.push('/dashboard');
        // alternatively, we can force a page reload
        toast.success('Magic link sent to your email!');
      },
      onSettled: () => {
        toast.dismiss('loading-passwordless-form');
      },
      onError: (error) => {
        dispatch({ type: AuthActionTypes.SIGN_OUT_SUCCESS });
        showErrorToast(error.message);
      },
    })
}