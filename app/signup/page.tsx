"use client"

import { useDarkMode } from '../context/DarkModeContext';
// HOOKS
import { useSignUp } from '../hooks/useSignUp';
// LIBRARIES
import { useForm, SubmitHandler } from 'react-hook-form';
// TYPES
import { SignUpFormValues } from '../types/pages/SignUpPageTypes';


const SignUp = () => {
  const { darkMode } = useDarkMode();
  const { signUp } = useSignUp();
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      username: "",
    }
  });

  // EVENTS
  const onSubmit: SubmitHandler<SignUpFormValues>= async ({ email, password, username }) => {
    signUp(email, password, username);
  }

  return (
    <div className={`${darkMode ? "dark" : ""} flex min-h-[90vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="w-full max-w-md space-y-8 flex flex-col items-stretch justify-center">
        <h2 className={`mt-6 text-center text-3xl font-bold tracking-tight ${darkMode ? "text-main-white" : "text-main-purple"}`}>
          Sign up
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

          <input
            type="text"
            placeholder='username'
            className={`full-width border-solid border-4 border-main-black p-2 ${darkMode ? "dark" : ""}`}
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must have at least 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Username must have at most 20 characters",
              },
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "Username must contain only letters and numbers",
              }
            })}
          />
          {errors.username && <p className={`text-midnight`}>{errors.username?.message}</p>}

          <div className='text-center'>
            <button type="submit" className={`primary-btn ${darkMode ? "dark" : ""}`}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;