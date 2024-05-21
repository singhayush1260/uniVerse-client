import classes from "../AuthPage.module.scss";
import { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { CiMail, CiLock } from "react-icons/ci";
import { BiHide, BiShow } from "react-icons/bi";
import { login_schema } from "./login_schema";
import {useMutation} from "react-query";
import { login } from "../../../api/auth";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularLoader from "../../../component/loaders/circular-loader/CircularLoader";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const{mutate,isLoading,isError,error}=useMutation(login,{
    onSuccess:(user)=>{
      console.log("siccess",user)
      dispatch({type:"setUser",payload:user})
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
  console.log("errrrrrrs",error?.message)
  return (
    <main className={classes.page_wrapper}>
      <div className={classes.form_container}>
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
      </div>
      {/* <div className={classes.graphics_container}>
        .
      </div> */}
    </main>
  );
};
export default Login;
