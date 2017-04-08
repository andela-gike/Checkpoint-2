// This is the set of validation rules that applies to the signup route.
const validator = {
  firstname: {
    rules: [
      {
        test: /^[a-z]+$/i,
        message: 'Firstname must contain only alphabets',
      },
      {
        test: (value) => {
          return value.length > 2;
        },
        message: 'Firstname must be longer than two characters',
      },
    ],
    errors: [],
    state: '',
    valid: false,
  },
  lastname: {
    rules: [
      {
        test: /^[a-z]+$/i,
        message: 'Lastname must contain only alphabets',
      },
      {
        test: (value) => {
          return value.length > 2;
        },
        message: 'Lastname must be longer than two characters',
      },
    ],
    errors: [],
    state: '',
    valid: false,
  },
  email: {
    rules: [
      {
        test: /^[a-z]+$/i,
        message: 'email must contain only alphabets',
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
        message: 'Username must contain only alphabets-numeric characters',
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
          if (validator.confirmPass.state !== validator.password.state) {
            validator.confirmPass.errors[0] = ('Passwords do not match');
            validator.confirmPass.valid = false;
          } else {
            validator.confirmPass.valid = true;
          }
          return value.length >= 6;
        },
        message: 'Password must not be shorter than 6 characters',
      },
    ],
    errors: [],
    state: '',
    valid: false,
  },
  confirmPass: {
    rules: [
      {
        test: (value) => {
          return validator.password.state === value;
        },
        message: 'Passwords do not match',
      },
    ],
    errors: [],
    state: '',
    valid: false,
  },
};

export default validator;
