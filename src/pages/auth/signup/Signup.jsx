import classes from "../AuthPage.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import EnterEmail from "./EnterEmail";
import EnterOTP from "./EnterOTP";
import CreateUser from "./CreateUser";
const Signup = () => {
  const[email,setEmail]=useState("");
  const [step, setStep] = useState(1);
  return (
    <main className={classes.page_wrapper}>
      <div className={classes.form_container}>
        <h1>Create your account</h1>
        <p>Join your college community now!</p>
         
         {step === 1 && <EnterEmail setStep={setStep} setEmail={setEmail}/>}
          {step === 2 && <EnterOTP setStep={setStep} email={email}/> }
          {step === 3 && <CreateUser email={email}/>}
        <div className={classes.link}>
          <p>Already have an account?</p>
          <Link to="/login">Log In</Link>
        </div>
      </div>
    </main>
  );
};
export default Signup;
