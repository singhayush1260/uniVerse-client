import * as Yup from 'yup';

const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/;

export const signup_schema = Yup.object({
  Name: Yup.string().min(4).max(25).required('Name cannot be empty'),
  Email: Yup.string().matches(emailRegex, 'Enter a valid email').required('Email cannot be empty'),
  Password: Yup.string().matches(passwordRegex, 'Password must be at least 8 characters, contain an uppercase, lowercase, digit, symbol').required('Password cannot be empty'),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref('Password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  OTP: Yup.string()
    .matches(/^\d{6}$/, 'OTP must be a 6-digit number')
    .required('OTP field cannot be empty'),
});
