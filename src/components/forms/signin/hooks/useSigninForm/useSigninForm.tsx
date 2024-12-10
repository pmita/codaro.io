import { SubmitHandler, useForm } from "react-hook-form";
import { ISignInForm } from "../../types";
import { useSignin } from "@/hooks/useSignin";
import { LoadingSpinner } from "@/components/loading-spinner";
import { toast } from "sonner";


export const useSigninForm = () => {
  const mutation= useSignin();
  const { register, handleSubmit, formState: { errors } } = useForm<ISignInForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    }
  });
  
  const onSubmit: SubmitHandler<ISignInForm> = async ({ email, password }) => {
    mutation.mutate({ email, password });

    if (mutation.isIdle) {
      toast(
        <div className="flex justify-center items-center gap-4">
          <LoadingSpinner /> Loadding...
        </div>, {
          id: 'loading-signin-form',
      })
    }
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  }

}