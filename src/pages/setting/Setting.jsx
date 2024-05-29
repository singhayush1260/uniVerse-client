import classes from "./Setting.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { HiAtSymbol } from "react-icons/hi2";
import { CiMenuKebab } from "react-icons/ci";
import LazyImage from "../../component/lazy-image/LazyImage";
import PersonalSetting from "./personal-setting-form/PersonalSetting";
import SocialsSetting from "./social-setting-form/SocialsSetting";
import SecuritySetting from "./security-setting-form/SecuritySetting";
import Appbar from "../../component/appbar/Appbar";
import { motion } from "framer-motion";
import Modal from "../../component/modal/Modal";
import useUser from "../../hooks/useUser";
const Setting = () => {

  const[currentOption, setCurrentOption]=useState(0);

  const{user}=useUser();
  
  return (
   <>
    <Appbar/>
    <main className={classes.page_wrapper}>
      <motion.div className={classes.settings_container} initial={{ x: "-500px" }}
        animate={{ x: "-5px" }}
        exit={{ x: 0 }}
        transition={{ duration: 0.8 }}>
        {/* <div className={classes.top}>
          <div className={classes.user}>
            <LazyImage src={profile_picture} />
            <div className={classes.group}>
              <b>{name}</b>
              <em>{userId}</em> 
            </div>
          </div>
          <CiMenuKebab/>
        </div> */}
        <div className={classes.bottom}>
          <div className={classes.sidebar}>
            <div className={`${classes.option} ${currentOption==0 && classes.current_option}`} onClick={()=>setCurrentOption(0)}>
              <FaRegUser/> Personal
            </div>
            <div className={`${classes.option} ${currentOption==1 && classes.current_option}`} onClick={()=>setCurrentOption(1)}>
              <HiAtSymbol/> Socials
            </div>
            <div className={`${classes.option} ${currentOption==2 && classes.current_option}`} onClick={()=>setCurrentOption(2)}>
              <MdOutlineSecurity/> Security
            </div>
          </div>
          <div className={classes.form_container}>
           { currentOption ===0 &&  <PersonalSetting name={user?.Name} userId={user?._id} bio={user?.bio}/>  }
           { currentOption===1 &&  <SocialsSetting/> }
           { currentOption ===2 &&  <SecuritySetting/>  }
          </div>
        </div>
      </motion.div>
    </main>
   </>
  );
};
export default Setting;
