import classes from '../AuthPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { CiUser, CiLock } from "react-icons/ci";
import { BiHide, BiShow } from "react-icons/bi";
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import { createAccountSchema } from './signup_schema';
import CircularLoader from '../../../component/loaders/circular-loader/CircularLoader';
import { useState } from 'react';
import useSignup from '../../../hooks/auth/useSignup';
const CreateAccount=()=>{

  const navigate=useNavigate();

  const[showPassword, setShowPassword]=useState({password:false, confirmPassword:false})

  const{createAccount, creatingAccount, accountCreated}=useSignup();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
  useFormik({
    initialValues: { Name: "", Password:"", VerifyPassword:"" },
    validationSchema: createAccountSchema,
    onSubmit: async (values) => {
      const { Name, Password, ConfirmPassword } = values;
      console.log(Name, Password, ConfirmPassword);
      createAccount(Name, Password);
      if(accountCreated){
        navigate("/");
      }
    },
  });
    return(
        <motion.div className={classes.form_container} initial={{ x: "-300px" }}
        animate={{ x: "-5px" }}
        exit={{ x: 0 }}
        transition={{ duration: 0.5 }}>
        <h2>Create your account</h2>
        <p>Join your community now</p>
        <form onSubmit={handleSubmit}>
        <div className={`${classes.form_group}  ${ errors.Name && touched.Name ? classes.input_error : "" }`} >
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
        <div className={`${classes.form_group}  ${ errors.Password && touched.Password ? classes.input_error : "" }`} >
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
        <div className={`${classes.form_group}  ${ errors.ConfirmPassword && touched.ConfirmPassword ? classes.input_error : "" }`} >
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
          <div className={classes.button_container}>
          {creatingAccount && <button>Creating account, please hold <CircularLoader height="14px" width="14px" borderColor="black"/></button>}
          {!creatingAccount && <button>Create Account</button>}
          </div>
        </form>
        <div className={classes.link_group}>
            Already have an account?
            <Link to="/login">Login</Link>
          </div>
      </motion.div>
    )
}
export default CreateAccount;