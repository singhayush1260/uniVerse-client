import * as Yup from "yup";

const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
export const securitySettingSchema = Yup.object({
    CurrentPassword: Yup.string().min(8).required('Cannot be empty'),
    NewPassword: Yup.string().matches(passwordRegex, 'Password must be at least 8 characters, contain an uppercase, lowercase, digit, symbol').required('Please enter your new password'),
    ConfirmNewPassword: Yup.string().oneOf([Yup.ref('NewPassword'), null], 'Passwords must match').required('Please confirm your new password'),
});