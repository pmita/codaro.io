"use client" 

import { useSigninMutation } from '@/hooks/mutations/useSigninMutation';
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
          label={input.label}
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

      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or
        </span>
      </div>

      <Button
        // onClick={signInWithGoogle}
        className={cn(buttonVariants({ variant: "secondary", size: "lg" }), styles.googleBtn)}
        type="button"
      >

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
        Sign in with Google
      </Button>
    </form>
  );
}