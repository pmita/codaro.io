import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthActionTypes } from "@/context/auth-context/types";
import { useAuth } from "../../useAuth";
import { createUser, createUserDoc, updateDisplayName } from "./utils";
import { showErrorToast } from "@/lib/toasts";
import { app, auth } from "@/firebase/client/config";
import { ISignUpForm } from "@/components/forms/signup-form/types";
import { createUserTable } from "@/data/db/user/insert";
import { createSessionCookie } from "@/data/auth/createSessionCookie";
import { setAuthCookie } from "@/lib/cookies";
import { getAuth, getIdToken } from "firebase/auth";


export const useSignupMutation = () => {
    const router = useRouter();
    const { dispatch } = useAuth();
    return useMutation({
      mutationKey: ['signin'],
      mutationFn: async ({ email, password, username }: ISignUpForm) => {
        const response = await createUser(email, password);

        if(response.user) {
          const currentUser = getAuth(app).currentUser;
          if (currentUser) {
            const idToken = await getIdToken(currentUser, true);
            const sessionCookie = await createSessionCookie(idToken, {
              expiresIn: 60 * 60 * 24 * 5,
            });

            setAuthCookie(sessionCookie);

            dispatch({ type: AuthActionTypes.SIGN_UP_SUCCESS, payload: auth.currentUser });
          }
        }
        
        if(response.user) {
          await updateDisplayName(username);
          await createUserDoc(username, email);
          
          dispatch({ type: AuthActionTypes.SIGN_UP_SUCCESS, payload: auth.currentUser });
        }
      },
      onSuccess: () => {
        router.push('/dashboard');
      },
      onSettled: () => {
        toast.dismiss('loading-signup-form');
      },
      onError: (error) => {
        dispatch({ type: AuthActionTypes.SIGN_OUT_SUCCESS });
        showErrorToast(error.message);
      },
    })
}