// NEXT
import { useRouter } from "next/navigation";
// PACKAGES
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// HOOKS
import { useAuth } from "../../useAuth";
// UTILS
import { signout } from "./utils";
// TYPES
import { AuthActionTypes } from "@/context/auth-context/types";



export const useSignoutMutation = () => {
    const router = useRouter();
    const { dispatch } = useAuth();
    return useMutation({
      mutationKey: ['signin'],
      mutationFn: async () => {
        await signout();

        const apiResponse = await fetch('/api/auth/sign-out', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!apiResponse.ok) {
          const errorData = await apiResponse.json();
          throw new Error(errorData.message || "Failed to sign in");
        }
        dispatch({ type: AuthActionTypes.SIGN_OUT_SUCCESS });
      },
      onSuccess: () => {
        router.push('/');
        router.refresh();
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