import classes from "../AuthPage.module.scss";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation,useQueryClient } from "react-query";
import { motion } from "framer-motion";
import { CiUser, CiLock } from "react-icons/ci";
import { BiHide, BiShow } from "react-icons/bi";
import { create_user_schema } from "./signup_schema";
import { createUser } from "../../../api/auth";
import { toast } from 'react-toastify';
import CircularLoader from "../../../component/loaders/circular-loader/CircularLoader";
const CreateUser = ({email}) => {
  const [showPassword, setShowPassword] = useState({password:false, confirmPassword:false});
  const navigate=useNavigate();
  const queryClient=useQueryClient();
  const {mutate,isLoading}=useMutation(createUser,{
    onSuccess: async ()=>{
       toast("User created!",{
        position:"top-center",
        theme:"dark",
        type:"success",
        autoClose:3000
       })
       await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError:(error)=>{
      toast(error?.message,{
       position:"top-center",
       theme:"dark",
       type:"error",
       autoClose:3000
      })
      navigate("/");
   },
  }); 
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: { Name:"", Username:"",Password: "",ConfirmPassword:"" },
      validationSchema: create_user_schema,
      onSubmit: async (values) => {
        console.log("valuessssss",values)
        const { Name,Username, Password } = values;
        console.log(Name,Username, email, Password);
        mutate({name:Name,username:Username, email,password:Password});
      },
    });


  return (
   <motion.form onSubmit={(e)=>handleSubmit(e)}  initial={{ x: "-500px" }}
   animate={{ x: "-5px" }}
   exit={{ x: 0 }}
   transition={{ duration: 0.5 }}>
     <div>
     <div
        className={`${classes.field_group_one}  ${
          errors.Name && touched.Name ? classes.field_group__warning : ""
        }`}
      >
        <div className={classes.input_controller}>
          <CiUser />
          <input
            type="text"
            id="Name"
            name="Name"
            placeholder="Name"
            value={values.Name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.Name && touched.Name && <p>{errors.Name}</p>}
      </div>
      <div
        className={`${classes.field_group_one}  ${
          errors.Username && touched.Username ? classes.field_group__warning : ""
        }`}
      >
        <div className={classes.input_controller}>
          <CiUser />
          <input
            type="text"
            id="Username"
            name="Username"
            placeholder="Username"
            value={values.Username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.Username && touched.Username && <p>{errors.Username}</p>}
      </div>
      <div
        className={`${classes.field_group_one}  ${
          errors.Password && touched.Password
            ? classes.field_group__warning
            : ""
        }`}
      >
        <div className={classes.input_controller}>
          <CiLock />
          <input
            type={showPassword.password ? "text" : "password"}
            id="Password"
            name="Password"
            placeholder="Password"
            value={values.Password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {!showPassword.password && <BiShow onClick={() => setShowPassword(prevState => ({ ...prevState, password: true }))} />}
          {showPassword.password && <BiHide onClick={() => setShowPassword(prevState => ({ ...prevState, password: false }))} />}
        </div>
        {errors.Password && touched.Password && <p>{errors.Password}</p>}
      </div>
      <div
        className={`${classes.field_group_one}  ${
          errors.ConfirmPassword && touched.ConfirmPassword
            ? classes.field_group__warning
            : ""
        }`}
      >
        <div className={classes.input_controller}>
          <CiLock />
          <input
            type={showPassword.confirmPassword ? "text" : "password"}
            id="ConfirmPassword"
            name="ConfirmPassword"
            placeholder="Confirm Password"
            value={values.ConfirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {!showPassword.confirmPassword && <BiShow onClick={() => setShowPassword(prevState => ({ ...prevState, confirmPassword: true }))} />}
          {showPassword.confirmPassword && <BiHide onClick={() => setShowPassword(prevState => ({ ...prevState, confirmPassword: false }))} />}
        </div>
        {errors.ConfirmPassword && touched.ConfirmPassword && (
          <p>{errors.ConfirmPassword}</p>
        )}
      </div>
      <div className={classes.field_group_one}>
      <button type="submit" disabled={isLoading}>{isLoading ? <CircularLoader borderColor={"black"}/> :"Create"}</button>
      </div>
    </div>
   </motion.form>
  );
};
export default CreateUser;
