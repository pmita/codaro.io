// NEXT
import { useRouter } from "next/navigation";
// PACKAGES
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// HOOKS
import { useAuth } from "../../useAuth";
// UTILS
import { signUserIn } from "./utils";
// LIB
import { showErrorToast } from "@/lib/toasts";
// types
import { AuthActionTypes } from "@/context/auth-context/types";


export const useSigninMutation = () => {
    const router = useRouter();
    const { dispatch } = useAuth();

    return useMutation({
      mutationKey: ['signin'],
      mutationFn: async ({ email, password }: { email: string, password: string }) => {
        const response = await signUserIn(email, password);
        
        if(response.user) {
          const idToken = await response.user.getIdToken();

          if (!idToken) {
            throw new Error("Failed to retrieve ID token");
          }

          const apiResponse = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
          });

          if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            throw new Error(errorData.message || "Failed to sign in");
          }

          dispatch({ type: AuthActionTypes.SIGN_IN_SUCCESS, payload: response.user });
        }
      },
      onSuccess: () => {
        // we can re-direct user to dashboard after we ensure the session cokoie exists 
        // router.push('/dashboard');
        // alternatively, we can force a page reload
        window.location.replace("/dashboard"); // ensures cookie is sent to server
      },
      onSettled: () => {
        toast.dismiss('loading-signin-form');
      },
      onError: (error) => {
        dispatch({ type: AuthActionTypes.SIGN_OUT_SUCCESS });
        showErrorToast(error.message);
      },
    })
}