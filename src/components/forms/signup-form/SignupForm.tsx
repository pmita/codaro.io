"use client" 

import { useSigninMutation } from '@/hooks/useSigninMutation';
import { useSignupForm } from './hooks/useSignupForm/useSignupForm';
// import { useGoogleSignIn } from '@/hooks/useGoogleSignIn';
import { FieldWithLabel } from '../components/field-wtih-label';
import { Button, buttonVariants } from '@/components/ui/button';
import { signupFields } from '@/config/forms';
import styles from './styles.module.css'
import { ISignUpForm } from './types';

export const SignupForm = () => {
  const mutation= useSigninMutation();
  const { register, handleSubmit, onSubmit, errors } = useSignupForm();

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className={styles.container}
    >
      {signupFields && signupFields.map((input) => (
        <FieldWithLabel
          key={input.id}
          name={input.name}
          type={input.type}
          placeholder={input.placeholder}
          register={register}
          validationSchema={input.validationSchema}
          error={errors[input.name as keyof ISignUpForm]?.message}
        />
      ))}

      <Button
        className={buttonVariants({ size: "lg" })}
        disabled={mutation.isPending}
        type="submit"
      >
        Sign Up
      </Button>
    </form>
  );
}