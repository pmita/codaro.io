// NEXT.JS
import { useRouter } from "next/navigation";
// DATA 
import { addUserToDb } from "@/data/db/user";
// PACKAGES
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// CONTEXT
import { AuthActionTypes } from "@/context/auth-context/types";
// HOOKS
import { useAuth } from "../../useAuth";
// UTILS
import { createUser } from "./utils";
// CONFIG
import { auth } from "@/firebase/client/config";
// LIB
import { showErrorToast } from "@/lib/toasts";
import { syncSessionCookie } from "@/lib/auth";
// TYPES
import { ISignUpForm } from "@/components/forms/signup-form/types";


export const useSignupMutation = () => {
    const router = useRouter();
    const { dispatch } = useAuth();
    return useMutation({
      mutationKey: ['signin'],
      mutationFn: async ({ email, password, username }: ISignUpForm) => {
        const response = await createUser(email, password);
        
        if(response.user) {
          const userData = {
            email,
            username,
            id: response.user.uid,
          }
          await Promise.all([
            syncSessionCookie(),
            addUserToDb(userData),
          ])
          
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