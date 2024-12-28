"use client" 

import { useSigninMutation } from '@/hooks/useSigninMutation';
import { useSigninForm } from './hooks/useSigninForm/useSigninForm';
// import { useGoogleSignIn } from '@/hooks/useGoogleSignIn';
import { FieldWithLabel } from '../components/field-wtih-label';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import styles from './styles.module.css'
import { signinFields } from '@/config/forms';
import { ISignInFormErrors } from './types';

export function SignInForm(){
  const mutation= useSigninMutation();
  // const { signInWithGoogle } = useGoogleSignIn();
  const { register, handleSubmit, onSubmit, errors } = useSigninForm();

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className={styles.container}
    >
      {signinFields && signinFields.map((input) => (
        <FieldWithLabel
          key={input.id}
          name={input.name}
          type={input.type}
          placeholder={input.placeholder}
          register={register}
          validationSchema={input.validationSchema}
          error={errors[input.name as keyof ISignInFormErrors]?.message}
        />
      ))}

      <Button
        className={buttonVariants({ size: "lg" })}
        disabled={mutation.isPending}
        type="submit"
      >
        Sign In
      </Button>

      <Button
        // onClick={signInWithGoogle}
        className={cn(buttonVariants({ variant: "secondary", size: "lg" }), styles.googleBtn)}
        type="button"
      >
        Sign in with Google
      </Button>
    </form>
  );
}