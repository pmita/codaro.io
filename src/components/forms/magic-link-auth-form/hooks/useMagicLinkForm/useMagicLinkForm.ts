// HOOKS
import { useMagicLinkMutation } from "@/hooks/mutations/useMagicLinkMutation";
// PACKAGES
import { SubmitHandler, useForm } from "react-hook-form";
import { showLoadingToast } from "@/lib/toasts";
// TYPES
import { IMagicLinkForm } from "../../types";


export const useMagicLinkForm = () => {
  // STATE && VARIABLES
  const mutation = useMagicLinkMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<IMagicLinkForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    }
  });
  
  // EVENTS
  const onSubmit: SubmitHandler<IMagicLinkForm> = async ({ email }) => {
    mutation.mutate({ email });

    if (mutation.isIdle) {
      showLoadingToast('loading-passwordless-form');
    }
  }

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isPending: mutation.isPending,
  }

}