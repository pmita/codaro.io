"use client" 

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSignin } from '@/hooks/useSignin';
import { useSigninForm } from './hooks/useSigninForm/useSigninForm';
// import { useGoogleSignIn } from '@/hooks/useGoogleSignIn';
import { FieldWithLabel } from '../components/field-wtih-label';
import { Button, buttonVariants } from '@/components/ui/button';
import { signinFields } from '@/config/forms';
import { ISignInFormErrors } from './types';
import styles from './styles.module.css'

export function SignInForm(){
  const router = useRouter();
  const { user } = useAuth();
  const mutation= useSignin();
  // const { signInWithGoogle } = useGoogleSignIn();
  const { register, handleSubmit, onSubmit, errors } = useSigninForm();


  // USE EFFECT
  // useEffect(() => {
  //   if (user) {
  //     router.push('/');
  //   }
  // }, [router, user]);

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
        className={buttonVariants({ variant: "secondary" })}
        disabled={mutation.isPending}
        type="submit"
      >
        Sign In
      </Button>

      <p>- or continue with -</p>

      <Button
        // onClick={signInWithGoogle}
        type="button"
      >
        Sign in with Google
      </Button>
      
      <Link 
        href="/signup" 
        className={styles.highlight}
      >
        Not a member? Sign Up
      </Link>
    </form>
  );
}