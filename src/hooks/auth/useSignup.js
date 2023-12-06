import { useState } from "react";

const useSignup = () => {
  const [signupState, setSignupState] = useState({
    verifyingOTP: false,
    OTPVerified: false,
    creatingAccount: false,
    accountCreated: false,
  });

  const { verifyingOTP, OTPVerified, creatingAccount, accountCreated } = signupState;

  const requestOTP = (email) => {
    console.log("requesting otp", email);
  };

  const verifyOTP = (otp) => {
    console.log("verifying otp", otp);
    setSignupState((prevState) => ({ ...prevState, verifyingOTP: true }));
    setTimeout(() => {
      // simulating API call
      setSignupState((prevState) => ({
        ...prevState,
        verifyingOTP: false,
        OTPVerified: true,
      }));
    }, 2500);
  };

  const createAccount = (name, password) => {
    console.log('creating account', name, password);
    setSignupState((prevState) => ({ ...prevState, creatingAccount: true }));
    setTimeout(() => {
        // simulating API call
        setSignupState((prevState) => ({
          ...prevState,
          creatingAccount: false,
          accountCreated: true,
        }));
      }, 2500);
  };

  return { requestOTP, verifyOTP, verifyingOTP, OTPVerified, createAccount, creatingAccount, accountCreated };
};

export default useSignup;
