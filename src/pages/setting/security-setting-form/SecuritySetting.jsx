import classes from "../Setting.module.scss";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { useState } from "react";
import { securitySettingSchema } from "./securitySettingSchema";
import { CiUser, CiLock } from "react-icons/ci";
import { BiHide, BiShow } from "react-icons/bi";
import { VscCheck } from "react-icons/vsc";
import CircularLoader from "../../../component/loaders/circular-loader/CircularLoader";
const SecuritySetting = ({ name: CurrentUser }) => {
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmNewPassword: false,
  });
  const [verifyingCurrentPassword, setVerifyingCurrentPassword] =
    useState(false);
  const [currentPasswordVerified, setCurrentPasswordVerified] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        CurrentPassword: "",
        NewPassword: "",
        ConfirmNewPassword: "",
      },
      validationSchema: securitySettingSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  const verifyCurrentPassword = () => {
    setVerifyingCurrentPassword(true);
    // Simulating API call
    setTimeout(() => {
      setCurrentPasswordVerified(true);
      setVerifyingCurrentPassword(false);
    }, 2000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0.7, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`${classes.field_group}  ${
          errors.CurrentPassword && touched.CurrentPassword
            ? classes.field_group__warning
            : ""
        }`}
      >
        <label>Current Password</label>
        <div className={classes.input_controller}>
          <CiLock />
          <input
            type="password"
            placeholder="Enter current password"
            name="CurrentPassword"
            value={values.CurrentPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {currentPasswordVerified && (
            <VscCheck className={classes.verified_check} />
          )}
        </div>
        <div className={classes.loader}>
          {touched.CurrentPassword && !errors.CurrentPassword && (
            <span
              className={`${verifyingCurrentPassword && classes.verifying}`}
              onClick={() => verifyCurrentPassword()}
            >
              Verify
            </span>
          )}
          {verifyingCurrentPassword && (
            <CircularLoader height="10px" width="10px" />
          )}
        </div>
        {errors.CurrentPassword && touched.CurrentPassword && (
          <p>{errors.CurrentPassword}</p>
        )}
      </div>

      <div
        className={`${classes.field_group}  ${
          errors.NewPassword && touched.NewPassword
            ? classes.field_group__warning
            : ""
        }`}
      >
        <label>New Password</label>
        <div className={classes.input_controller}>
          <CiLock />
          <input
            type={showPassword.newPassword ? "text" : "password"}
            placeholder="Enter new password"
            name="NewPassword"
            value={values.NewPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {!showPassword.newPassword && (
            <BiShow
              onClick={() =>
                setShowPassword((prevState) => ({
                  ...prevState,
                  newPassword: true,
                }))
              }
            />
          )}
          {showPassword.newPassword && (
            <BiHide
              onClick={() =>
                setShowPassword((prevState) => ({
                  ...prevState,
                  newPassword: false,
                }))
              }
            />
          )}
        </div>
        {errors.NewPassword && touched.NewPassword && (
          <p>{errors.NewPassword}</p>
        )}
      </div>

      <div
        className={`${classes.field_group}  ${
          errors.ConfirmNewPassword && touched.ConfirmNewPassword
            ? classes.field_group__warning
            : ""
        }`}
      >
        <label>Confirm New Password</label>
        <div className={classes.input_controller}>
          <CiLock />
          <input
            type={showPassword.confirmNewPassword ? "text" : "password"}
            placeholder="Confirm new password"
            name="ConfirmNewPassword"
            value={values.ConfirmNewPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {!showPassword.confirmNewPassword && (
            <BiShow
              onClick={() =>
                setShowPassword((prevState) => ({
                  ...prevState,
                  confirmNewPassword: true,
                }))
              }
            />
          )}
          {showPassword.confirmNewPassword && (
            <BiHide
              onClick={() =>
                setShowPassword((prevState) => ({
                  ...prevState,
                  confirmNewPassword: false,
                }))
              }
            />
          )}
        </div>
        {errors.ConfirmNewPassword && touched.ConfirmNewPassword && (
          <p>{errors.ConfirmNewPassword}</p>
        )}
      </div>
      <button type="submit" className={classes.update_button}>
        Update
      </button>
    </motion.form>
  );
};
export default SecuritySetting;
