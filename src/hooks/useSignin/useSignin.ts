import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AuthActionTypes } from "@/context/AuthContext/types";
import { useAuth } from "../useAuth";
import { toast } from "sonner";
import { signUserIn, saveFirebaseCookie } from "./utils";


export const useSignin = () => {
    const router = useRouter();
    const { dispatch } = useAuth();
    return useMutation({
      mutationKey: ['signin'],
      mutationFn: async ({ email, password }: { email: string, password: string }) => {
        const response = await signUserIn(email, password);
        
        if(response.user) {
          await saveFirebaseCookie();
          dispatch({ type: AuthActionTypes.SIGN_IN_SUCCESS, payload: response.user });
        }
      },
      onSuccess: () => {
        router.push('/dashboard');
      },
      onSettled: () => {
        toast.dismiss('loading-signin-form');
      },
      onError: (error) => {
        // setUser(null);
        dispatch({ type: AuthActionTypes.SIGN_OUT_SUCCESS });
        toast("Something went wrong", {
          description: error.message,
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          }
        })
      },
    })
}