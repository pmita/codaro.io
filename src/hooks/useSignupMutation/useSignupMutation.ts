import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthActionTypes } from "@/context/auth-context/types";
import { useAuth } from "../useAuth";
import { createUser, createUserDoc, updateDisplayName } from "./utils";
import { showErrorToast } from "@/lib/toasts";
import { auth } from "@/firebase/client/config";
import { ISignUpForm } from "@/components/forms/signup-form/types";


export const useSignupMutation = () => {
    const router = useRouter();
    const { dispatch } = useAuth();
    return useMutation({
      mutationKey: ['signin'],
      mutationFn: async ({ email, password, username }: ISignUpForm) => {
        const response = await createUser(email, password);
        
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