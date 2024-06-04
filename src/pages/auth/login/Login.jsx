import classes from "../AuthPage.module.scss";
import { useState } from "react";
import { useMutation,useQueryClient } from "react-query";
import { useFormik } from "formik";
import { useSelector,useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CiMail, CiLock } from "react-icons/ci";
import { BiHide, BiShow } from "react-icons/bi";
import { login_schema } from "./login_schema";
import { login } from "../../../api/auth";
import CircularLoader from "../../../component/loaders/circular-loader/CircularLoader";
import { useSocketContext } from "../../../context/SocketContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const{socket}=useSocketContext();
  const dispatch = useDispatch();
  const queryClient=useQueryClient();
  const navigate=useNavigate();
  const{mutate,isLoading,isError,error}=useMutation(login,{
    onSuccess:async(user)=>{
      console.log("user from login",user)
      await queryClient.invalidateQueries("validateToken");
      navigate("/")
      
    },
    onError:()=>{

    }
  });
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
  useFormik({
    initialValues: { Email: "", Password: "" },
    validationSchema: login_schema,
    onSubmit: async (values) => {
      const { Email, Password } = values;
      console.log(Email, Password)
      mutate({Email,Password});
    },
  });
  return (
    <main className={classes.page_wrapper}>
      <motion.div className={classes.form_container} initial={{ x: "-500px" }}
   animate={{ x: "-5px" }}
   exit={{ x: 0 }}
   transition={{ duration: 0.5 }}>
        <h1>Log in to your account</h1>
        <p>Welcome back!</p>
        <form onSubmit={handleSubmit}>
          <div className={`${classes.field_group_one}  ${errors.Email && touched.Email ? classes.field_group__warning : ""}`}>
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
          <div className={`${classes.field_group_one}  ${errors.Password && touched.Password ? classes.field_group__warning : ""}`}>
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
          <div className={classes.field_group_two}>
            <div className={classes.input_controller}>
              <input type="checkbox" />
              <span>Remmember me</span>
            </div>
            <Link to="#">Forgot password?</Link>
          </div>
          { isError && <p style={{color:"red"}}>{error?.message}</p>}
          <div className={classes.field_group_one}>
            <button type="submit" disabled={isLoading}>{isLoading ? <CircularLoader borderColor={"black"}/> :"Login"}</button>
            
          </div>
        </form>
        <div className={classes.link}>
          <p>
            Don't have an account?
            </p>
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
