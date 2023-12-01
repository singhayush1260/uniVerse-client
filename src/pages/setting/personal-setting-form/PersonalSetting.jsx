import classes from "../Setting.module.scss";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { useState } from "react";
import { personalSettingSchema } from "./personalSettingSchema";
import { CiUser } from "react-icons/ci";
import { BsTextParagraph } from "react-icons/bs";
import { VscCheck } from "react-icons/vsc";
import CircularLoader from "../../../component/loaders/circular-loader/CircularLoader";
const PersonalSetting = ({ name, userId, bio }) => {
  const [verifyingUserId, setVerifyingUserId] = useState(false);
  const [userIdExists, setUserIDExists] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: { Name: "", UserId: "", Bio: "" },
      validationSchema: personalSettingSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  const doesUserIdExists = () => {
    setVerifyingUserId(true);
    // Simulating API call
    setTimeout(() => {
      setUserIDExists(false);
      setVerifyingUserId(false);
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
          errors.Name && touched.Name ? classes.field_group__warning : ""
        }`}
      >
        <label>Name</label>
        <div className={classes.input_controller}>
          <CiUser />
          <input
            type="text"
            placeholder={name}
            name="Name"
            value={values.Name || name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.Name && touched.Name && <p>{errors.Name}</p>}
      </div>

      <div
        className={`${classes.field_group}  ${
          errors.UserId && touched.UserId ? classes.field_group__warning : ""
        }`}
      >
        <label>UserId</label>
        <div className={classes.input_controller}>
          <CiUser />
          <input
            type="text"
            placeholder={userId}
            name="UserId"
            value={values.UserId || userId}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className={classes.loader}>
          {touched.UserId && !errors.UserId && (
            <span
              className={`${verifyingUserId && classes.verifying}`}
              onClick={() => doesUserIdExists()}
            >
              Verify
            </span>
          )}
          {verifyingUserId && <CircularLoader height="10px" width="10px" />}
          {userIdExists && <span>| UserID already exists</span>}
          {touched.UserId && !errors.UserId && !userIdExists && (
            <span>| {values.UserId} available</span>
          )}
        </div>
        {errors.UserId && touched.UserId && <p>{errors.UserId}</p>}
      </div>

      <div
        className={`${classes.field_group}  ${
          errors.Bio && touched.Bio ? classes.field_group__warning : ""
        }`}
      >
        <label>Bio</label>
        <div className={classes.input_controller}>
          <BsTextParagraph />
          {/* <input type="text" placeholder={bio} name="Bio" value={values.Bio} onChange={handleChange} onBlur={handleBlur} /> */}
          <textarea
            name="Bio"
            cols="30"
            rows="4"
            value={values.Bio || bio}
            onChange={handleChange}
            onBlur={handleBlur}
          ></textarea>
        </div>
        {errors.Bio && touched.Bio && <p>{errors.Bio}</p>}
      </div>

      <button type="submit" className={classes.update_button}>
        Update
      </button>
    </motion.form>
  );
};
export default PersonalSetting;
