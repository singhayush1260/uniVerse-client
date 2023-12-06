import classes from "../AuthPage.module.scss";
import { Link } from "react-router-dom";
import { CiUser, CiMail, CiLock } from "react-icons/ci";
import { GrLinkNext } from "react-icons/gr";
import { motion } from "framer-motion";
import { verifyOTPSchema } from "./signup_schema";
import { useFormik } from "formik";
import useSignup from "../../../hooks/auth/useSignup";
import CircularLoader from "../../../component/loaders/circular-loader/CircularLoader";
const VerifyEmail = ({ email,next, resendTime }) => {

  const{verifyOTP, verifyingOTP, OTPVerified}=useSignup();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: { OTP: "" },
      validationSchema: verifyOTPSchema,
      onSubmit: async (values) => {
        const { OTP } = values;
        console.log(OTP);
        verifyOTP(OTP);
        if(OTPVerified){
          console.log("FDFD")
          next(3);
        }
      },
    });

  return (
    <motion.div
      className={classes.form_container}
      initial={{ x: "-300px" }}
      animate={{ x: "-5px" }}
      exit={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Verify your email</h2>
      <p>Enter the OTP received on your email</p>
      <form onSubmit={handleSubmit}>
        <div className={`${classes.form_group}  ${ errors.OTP && touched.OTP ? classes.input_error : "" }`} >
          <div className={classes.input_controller}>
            <CiMail />
            <input
              type="password"
              placeholder="OTP"
              name="OTP"
              value={values.OTP}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.OTP && touched.OTP && <p>{errors.OTP}</p>}
        </div>
        <div className={classes.text_group}>
          <span style={{ cursor: resendTime !== 0 ? "not-allowed" : "pointer" }}>
            Resend OTP
          </span>
          {resendTime > 0 && <span>{resendTime} seconds</span>}
        </div>
        <div className={classes.button_container}>
          {verifyingOTP && <button>Verifying <CircularLoader height="14px" width="14px" borderColor="black"/></button>}
          {!verifyingOTP && <button>Next <GrLinkNext/></button>}
          {/* <button>Next <GrLinkNext/></button> */}
        </div>
      </form>
      <div className={classes.link_group}>
        Already have an account?
        <Link to="/login">Login</Link>
      </div>
    </motion.div>
  );
};
export default VerifyEmail;
