import classes from "../AuthPage.module.scss";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { CiMail } from "react-icons/ci";
import { email_schema } from "./signup_schema";
import { getOTP } from "../../../api/auth";
import { useMutation } from "react-query";
import CircularLoader from "../../../component/loaders/circular-loader/CircularLoader";
import { toast } from "react-toastify";
const EnterEmail = ({ setStep, setEmail }) => {
  console.log("fsfsfsdf", setStep);
  const { mutate, isLoading, isError, error } = useMutation(getOTP, {
    onSuccess: async () => {
      // await queryClient.invalidateQueries("validateToken");
      console.log("otp sent");
      toast("OTP Sent!", {
        position: "top-center",
        theme: "dark",
        type: "success",
        autoClose: 3000,
      });
      setStep(2);
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: { Email: "" },
      validationSchema: email_schema,
      onSubmit: async (values) => {
        const { Email } = values;
        console.log(Email);
        setEmail(Email);
        mutate(Email);
      },
    });

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
            errors.Email && touched.Email ? classes.field_group__warning : ""
          }`}
        >
          <div className={classes.input_controller}>
            <CiMail />
            <input
              type="text"
              placeholder="Email"
              name="Email"
              value={values.Email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.Email && touched.Email && <p>{errors.Email}</p>}
        </div>
        {isError && <p style={{ color: "red" }}>{error?.message}</p>}
        <div className={classes.field_group_one}>
          <button type="submit" disabled={isLoading}>
            {isLoading ? <CircularLoader borderColor={"black"} /> : "Continue"}
          </button>
        </div>
      </div>
    </motion.form>
  );
};
export default EnterEmail;
