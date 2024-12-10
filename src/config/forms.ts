export const signinFields = [
  {
    id: 1,
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    validationSchema: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      }
    }
  },
  {
    id: 2,
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    validationSchema: {
      required: "Password is required",
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        message: "Password must contain at least one uppercase letter, one lowercase letter and one number",
      }
    }
  }
];