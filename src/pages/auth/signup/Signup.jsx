import classes from "../AuthPage.module.scss";
import { useEffect, useState } from "react";
import CreateAccount from "./CreateAccount";
import EnterEmail from "./EnterEmail";
import VerifyEmail from "./VerifyEmail";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [resendTime, setResendTime]=useState(60);

  useEffect(()=>{
    const resendTimer=setInterval(()=>{
        setResendTime((t)=> t-1 <0 ? 0 :t-1)
    },1000)
    return ()=>clearInterval(resendTimer);
  },[step])

  const renderUI = (step) => {
    switch (step) {
      case 1:
        return <EnterEmail next={setStep}/>;
      case 2:
        return <VerifyEmail next={setStep} resendTime={resendTime}/>;
      case 3:
        return <CreateAccount />;
    }
  };
  return <main className={classes.page_wrapper}>{renderUI(step)}</main>;
};
export default Signup;
