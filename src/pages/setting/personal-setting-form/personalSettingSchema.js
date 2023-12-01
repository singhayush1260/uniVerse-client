import * as Yup from "yup";
export const personalSettingSchema = Yup.object({
    Name: Yup.string().min(4).max(25).required('Name cannot be empty'),
    UserId:Yup.string().min(4).max(15).required('User ID cannot be empty'),
    Bio:Yup.string().min(50).max(100).required('Bio cannot be empty'),
});