import * as Yup from "yup";

const emailRegex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const login_schema = Yup.object({
  Email:Yup.string().matches(emailRegex,'Enter a valid email').required('Email cannot be empty'),
  Password: Yup.string().required("Password cannot be empty"),
});