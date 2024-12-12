import { SubmitHandler, useForm } from "react-hook-form";
import { useSignin } from "@/hooks/useSignin";
import { showLoadingToast } from "@/lib/toasts";
import { ISignInForm } from "../../types";


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
      showLoadingToast('loading-signin-form');
    }
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  }

}