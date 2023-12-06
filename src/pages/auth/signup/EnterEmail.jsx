import classes from "../AuthPage.module.scss";
import { Link } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { GrLinkNext } from "react-icons/gr";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { enterEmailSchema } from "./signup_schema";
import useSignup from "../../../hooks/auth/useSignup";
const EnterEmail = ({ next}) => {

  const{requestOTP}=useSignup();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: { Email: "" },
      validationSchema: enterEmailSchema,
      onSubmit: async (values) => {
        const { Email } = values;
        console.log(Email);
        //setEmail(Email);
        requestOTP(Email);
        next(2);
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
      <h2>Enter your email</h2>
      <p>Join your community now</p>
      <form onSubmit={handleSubmit}>
        <div className={`${classes.form_group}  ${errors.Email && touched.Email ? classes.input_error : ""}`}>
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
        <div className={classes.button_container}>
          <button>
            Next <GrLinkNext />
          </button>
        </div>
      </form>
      <div className={classes.link_group}>
        Already have an account?
        <Link to="/login">Login</Link>
      </div>
    </motion.div>
  );
};
export default EnterEmail;
