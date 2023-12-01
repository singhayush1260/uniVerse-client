import classes from "../AuthPage.module.scss";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CiUser, CiMail, CiLock } from "react-icons/ci";
import { CgPassword } from "react-icons/cg";
import { BiHide, BiShow } from "react-icons/bi";
import { signup_schema } from "./signup_schema";
const Signup = () => {
  const [showPassword, setShowPassword] = useState({password:false, confirmPassword:false});
  const [step, setStep] = useState(1);
  const [time, setTime] = useState(60);
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: { Email: "", Password: "" },
      validationSchema: signup_schema,
      onSubmit: async (values) => {
        const { Email, Password } = values;
        console.log(Email, Password);
      },
    });
  useEffect(() => {
    const otpTimer = setInterval(() => {
      setTime((time) => (time < 1 ? 0 : time - 1));
    }, 1000);

    return () => {
      clearInterval(otpTimer);
    };
  }, [step]);
  const stepOne = () => {
    return (
      <motion.div
        initial={{ x: "-500px" }}
        animate={{ x: "-5px" }}
        exit={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`${classes.field_group_one}  ${errors.Email && touched.Email ? classes.field_group__warning : ""}`}>
          <div className={classes.input_controller}>
            <CiMail />
            <input type="text" placeholder="Email" />
          </div>
          {errors.Email && touched.Email && <p>{errors.Email}</p>}
        </div>
        <div className={classes.field_group_one}>
          <button onClick={() => setStep(2)}>Continue</button>
        </div>
      </motion.div>
    );
  };
  const stepTwo = () => {
    return (
      <motion.div
        initial={{ x: "-500px" }}
        animate={{ x: "-5px" }}
        exit={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`${classes.field_group_one}  ${
            errors.OTP && touched.OTP ? classes.field_group__warning : ""
          }`}
        >
          <div className={classes.input_controller}>
            <CgPassword />
            <input
              type="password"
              placeholder="Enter OTP"
              id="OTP"
              value={values.OTP}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </div>
        <div className={classes.field_group_one}>
          {/* <button onClick={()=>setStep(1)}>Back</button> */}
          <button onClick={() => setStep(3)}>Continue</button>
        </div>
        <div className={classes.field_group_two}>
          <div className={classes.input_controller}>
            <p style={{ cursor: time != 0 ? "not-allowed" : "pointer" }}>
              Resend OTP
            </p>
            <p>{time}</p>
          </div>
        </div>
      </motion.div>
    );
  };
  const stepThree = () => {
    return (
      <motion.div
        initial={{ x: "-500px" }}
        animate={{ x: "-5px" }}
        exit={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
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
          <button>Continue</button>
        </div>
      </motion.div>
    );
  };

  return (
    <main className={classes.page_wrapper}>
      <div className={classes.form_container}>
        <h1>Create your account</h1>
        <p>Join your college community now!</p>
        <form>
          {step === 1 && stepOne()}
          {step === 2 && stepTwo()}
          {step === 3 && stepThree()}
        </form>
        <div className={classes.link}>
          <p>Already have an account?</p>
          <Link to="/login">Log In</Link>
        </div>
      </div>
    </main>
  );
};
export default Signup;
