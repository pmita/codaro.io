"use client"

import { useRouter } from 'next/navigation';
import { useDarkMode } from '../context/DarkModeContext';
import { useSignIn } from '../hooks/useSignIn';
// LIBRARIES
import { useForm, SubmitHandler } from 'react-hook-form';

type LoginFormValues = {
  email: string;
  password: string;
}

const Login = () => {
  const { darkMode } = useDarkMode();
  const router = useRouter();
  const { signIn } = useSignIn();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    }
  });

  // EVENTS
  const onSubmit: SubmitHandler<LoginFormValues>= async ({ email, password }) => {
    signIn(email, password);
    // router.push("/");
  }

  return (
    <div className={`${darkMode ? "dark" : ""} flex min-h-[90vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="w-full max-w-md space-y-8 flex flex-col items-stretch justify-center">
        <h2 className={`mt-6 text-center text-3xl font-bold tracking-tight ${darkMode ? "text-main-white" : "text-main-purple"}`}>
          Sign in to your account
        </h2>


        <form className="mt-8 max-w-xs md:max-w-md flex flex-col justify-center items-stretch gap-6" onSubmit={handleSubmit(onSubmit)}>
          <input 
            type="email"
            placeholder="Email"
            className={`max-width-[100%] border-solid border-4 border-main-black p-2 ${darkMode ? "dark" : ""}`}
            {...register("email",{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              }
            })}
          />
          {errors.email && <p className={`text-midnight`}>{errors.email?.message}</p>}

          <input 
            type="password"
            placeholder="Password"
            className={`full-width border-solid border-4 border-main-black p-2 ${darkMode ? "dark" : ""}`}
            {...register("password",{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message: "Password must contain at least one uppercase letter, one lowercase letter and one number",
              }
            })}
          />
          {errors.password && <p className={`text-midnight`}>{errors.password?.message}</p>}

          <div className='text-center'>
            <button type="submit" className={`primary-btn ${darkMode ? "dark" : ""}`}>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;