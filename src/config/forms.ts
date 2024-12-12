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

export const signupFields = [
  ...signinFields,
  {
    id: 3,
    name: 'username',
    type: 'text',
    placeholder: 'Username',
    validationSchema: {
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
    }}
];
