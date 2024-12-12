import { SubmitHandler, useForm } from "react-hook-form";
import { useSignup } from "@/hooks/useSignup";
import { showLoadingToast } from "@/lib/toasts";
import { ISignUpForm } from "../../types";


export const useSignupForm = () => {
  const mutation= useSignup();
  const { register, handleSubmit, formState: {errors } } = useForm<ISignUpForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      username: '',
    }
  });
  
  const onSubmit: SubmitHandler<ISignUpForm> = async ({ email, password, username }) => {
    mutation.mutate({ email, password, username });

    if (mutation.isIdle) {
      showLoadingToast('loading-signup-form');
    }
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  }

}