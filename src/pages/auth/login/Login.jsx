import classes from "../AuthPage.module.scss";
import { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { CiMail, CiLock } from "react-icons/ci";
import { BiHide, BiShow } from "react-icons/bi";
import { login_schema } from "./login_schema";
import { motion } from "framer-motion";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
  useFormik({
    initialValues: { Email: "", Password: "" },
    validationSchema: login_schema,
    onSubmit: async (values) => {
      const { Email, Password } = values;
      console.log(Email, Password)
      
    },
  });
  return (
    <main className={classes.page_wrapper}>
      <motion.div className={classes.form_container}  
      initial={{ x: "-300px" }}
      animate={{ x: "-5px" }}
        exit={{ x: 0 }}
        transition={{ duration: 0.5 }}>
        <h2>Log in to your account</h2>
        <p>Welcome back!</p>
        <form onSubmit={handleSubmit}>
          <div className={`${classes.form_group}  ${errors.Email && touched.Email ? classes.input_error : ""}`}>
            <div className={classes.input_controller}>
              <CiMail />
              <input type="text"
              id="Email"
              name="Email"
              placeholder="Email"
              value={values.Email}
              onChange={handleChange}
              onBlur={handleBlur} />
            </div>
            {errors.Email && touched.Email && <p>{errors.Email}</p>}
          </div>
          <div className={`${classes.form_group}  ${errors.Password && touched.Password ? classes.input_error : ""}`}>
            <div className={classes.input_controller}>
              <CiLock />
              <input  type={showPassword ? "text" : "password"}
              id="Password"
              name="Password"
              placeholder="Password"
              value={values.Password}
              onChange={handleChange}
              onBlur={handleBlur}/>
              {!showPassword && (<BiShow onClick={() => setShowPassword(true)} />)}
              {showPassword && (<BiHide onClick={() => setShowPassword(false)} />)}
            </div>
            {errors.Password && touched.Password && <p>{errors.Password}</p>}
          </div>
          <div className={classes.form_group_two}>
            <div className={classes.input_controller}>
              <input type="checkbox" />
              <span>Remmember me</span>
            </div>
            <Link to="#">Forgot password?</Link>
          </div>
          <div className={classes.button_container}>
            <button>Login</button>
          </div>
        </form>
        <div className={classes.link_group}>
            Don't have an account?
            <Link to="/signup">Sign Up</Link>
          </div>
      </motion.div>
      {/* <div className={classes.graphics_container}>
        .
      </div> */}
    </main>
  );
};
export default Login;
