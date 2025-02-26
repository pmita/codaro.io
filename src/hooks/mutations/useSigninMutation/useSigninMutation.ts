import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthActionTypes } from "@/context/auth-context/types";
import { useAuth } from "../../useAuth";
import { saveFirebaseCookie, signUserIn } from "./utils";
import { showErrorToast } from "@/lib/toasts";
import { removeAuthCookie, setAuthCookie } from "@/lib/cookies";
import { getAuth, getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import { app, auth } from "@/firebase/client/config";
import { createSessionCookie } from "@/data/auth/createSessionCookie";


export const useSigninMutation = () => {
    const router = useRouter();
    const { dispatch } = useAuth();
    return useMutation({
      mutationKey: ['signin'],
      mutationFn: async ({ email, password }: { email: string, password: string }) => {
        const response = await signUserIn(email, password);
        
        if(response.user) {
          const currentUser = getAuth(app).currentUser;
          if (currentUser) {
            const idToken = await getIdToken(currentUser, true);
            const sessionCookie = await createSessionCookie(idToken, {
              expiresIn: 60 * 60 * 24 * 5,
            });

            setAuthCookie(sessionCookie);

            dispatch({ type: AuthActionTypes.SIGN_IN_SUCCESS, payload: response.user });
          }
        }
      },
      onSuccess: () => {
        router.push('/dashboard');
      },
      onSettled: () => {
        toast.dismiss('loading-signin-form');
      },
      onError: (error) => {
        removeAuthCookie();
        dispatch({ type: AuthActionTypes.SIGN_OUT_SUCCESS });
        showErrorToast(error.message);
      },
    })
}