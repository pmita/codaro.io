import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../useAuth";
import { AuthActionTypes } from "@/context/auth-context/types";
import { toast } from "sonner";
import { signout } from "./utils";



export const useSignout = () => {
    const router = useRouter();
    const { dispatch } = useAuth();
    return useMutation({
      mutationKey: ['signin'],
      mutationFn: async () => {
        await signout();
        
      },
      onSuccess: () => {
        dispatch({ type: AuthActionTypes.SIGN_OUT_SUCCESS });
        router.push('/signin');
      },
      onSettled: () => {
        toast.dismiss('loading-signin-form');
      },
      onError: (error) => {
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