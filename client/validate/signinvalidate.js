// This is the set of validation rules that applies to the signup route.
const validator = {
  email: {
    rules: [
      {
        test: /^[a-z0-9_]+$/,
        message: 'email must contain only alphabets-numeric lowercase characters',
      },
      {
        test: (value) => {
          return value.length > 2;
        },
        message: 'email must be longer than two characters',
      },
    ],
    errors: [],
    state: '',
    valid: false,
  },
  username: {
    rules: [
      {
        test: /^[a-z0-9_]+$/,
        message: 'Username must contain only alphabets-numeric lowercase characters',
      },
      {
        test: (value) => {
          return value.length > 2;
        },
        message: 'Username must be longer than two characters',
      },
    ],
    errors: [],
    state: '',
    valid: false,
  },
  password: {
    rules: [
      {
        test: (value) => {
          return value.length >= 6;
        },
        message: 'Password must not be shorter than 6 characters',
      },
    ],
    errors: [],
    state: '',
    valid: false,
  },
};

export default validator;
