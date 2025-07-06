// PACKAGES
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// HOOKS
import { useAuth } from "../../useAuth";
// LIB
import { showErrorToast } from "@/lib/toasts";
// types
import { AuthActionTypes } from "@/context/auth-context/types";
import { updateSessionCookie } from "@/lib/auth";
import { getAdditionalUserInfo, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "@/lib/firebase/client/config";
import { addUserToDb } from "@/data/db/actions";
import { add } from "date-fns";


export const useConfirmMagicLinkMutation = () => {
    const { dispatch } = useAuth();

    return useMutation({
      mutationKey: ['confirm-magic-link'],
      mutationFn: async ({ email, authLink }: { email: string | null, authLink: string }) => {
        if(!authLink) {
          throw new Error("No authentication link provided");
        }

        if(!email) {
          throw new Error("No email provided");
        }

        if(!isSignInWithEmailLink(auth, authLink)) {
          throw new Error("Invalid authentication link");
        }

        try {
          const response = await signInWithEmailLink(auth, email, authLink);

          if(response.user) {
            const idToken = await response.user.getIdToken();
  
            if (!idToken) {
              throw new Error("Failed to retrieve ID token");
            }
          
            const additionalUserInfo = getAdditionalUserInfo(response);
            const isNewUser = additionalUserInfo?.isNewUser; 
  
            // await updateSessionCookie(idToken);

            await Promise.all([
              updateSessionCookie(idToken),
              isNewUser
                ?addUserToDb({
                  email,
                  username: "testUsername",
                  id: response.user.uid,
                })
                : Promise.resolve(),
            ])
  
            dispatch({ type: AuthActionTypes.SIGN_IN_SUCCESS, payload: response.user });
          }
        } catch(error) {
          throw new Error(`Failed to sign in: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
        
      },
      onSuccess: () => {
        // we can re-direct user to dashboard after we ensure the session cokoie exists 
        // router.push('/dashboard');
        // alternatively, we can force a page reload
        toast.success('Successfully signed in with magic link!');
        window.location.replace("/dashboard"); // ensures cookie is sent to server
      },
      onError: (error) => {
        dispatch({ type: AuthActionTypes.SIGN_OUT_SUCCESS });
        showErrorToast(error.message);
      },
    })
}