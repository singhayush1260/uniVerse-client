import classes from "../AuthPage.module.scss";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { CgPassword } from "react-icons/cg";
import { otp_schema } from "./signup_schema";
import { getOTP, verifyOTP } from "../../../api/auth";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import CircularLoader from "../../../component/loaders/circular-loader/CircularLoader";
const EnterOTP = ({ setStep, email }) => {
  const [time, setTime] = useState(5);

  const { mutate, isLoading, isError, error } = useMutation(verifyOTP, {
    onSuccess: async () => {
      // await queryClient.invalidateQueries("validateToken");
      console.log("otp verified");
      setStep(3);
    },
    onError: async () => {
      // await queryClient.invalidateQueries("validateToken");
      console.log("otp not verified");
      toast("Invalid OTP!", {
        position: "top-center",
        theme: "dark",
        type: "error",
        autoClose: 3000,
      });
    },
  });
  const {
    mutate: resendOTP,
    isLoading: resendingOTP,
    isError: resendingOTPIsError,
    isSuccess: OTPResentSuccess,
  } = useMutation(getOTP, {
    onSuccess: async () => {
      // await queryClient.invalidateQueries("validateToken");
      console.log("otp resent");
      toast("OTP Resent!", {
        position: "top-center",
        theme: "dark",
        type: "success",
        autoClose: 3000,
      });
      setTime(5);
    },
  });
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: { OTP: "" },
      validationSchema: otp_schema,
      onSubmit: async (values) => {
        const { OTP } = values;
        console.log(OTP);
        mutate(email, OTP);
      },
    });

  useEffect(() => {
    const otpTimer = setInterval(() => {
      setTime((time) => (time < 1 ? 0 : time - 1));
    }, 1000);

    return () => {
      clearInterval(otpTimer);
    };
  }, [time]);
  return (
    <motion.form
      onSubmit={(e) => handleSubmit(e)}
      initial={{ x: "-500px" }}
      animate={{ x: "-5px" }}
      exit={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
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
              name="OTP"
              value={values.OTP}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.OTP && touched.OTP && <p>{errors.OTP}</p>}
        </div>
        <div className={classes.field_group_one}>
          {/* <button onClick={()=>setStep(1)}>Back</button> */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? <CircularLoader borderColor={"black"} /> : "Continue"}
          </button>
        </div>
        <div className={classes.field_group_two}>
          <div className={classes.input_controller}>
            <p
              style={{ cursor: time != 0 ? "not-allowed" : "pointer" }}
              onClick={() => resendOTP(email)}
            >
              {resendingOTP ? "Resending..." : "Resend OTP"}
            </p>
            {time !== 0 && <p>{time}</p>}
          </div>
        </div>
      </div>
    </motion.form>
  );
};
export default EnterOTP;
