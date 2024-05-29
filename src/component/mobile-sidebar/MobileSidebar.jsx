import classes from "./MobileSidebar.module.scss";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
const MobileSidebar=({children, onClose})=>{
return(
    <motion.div className={classes.mobile_sidebar} initial={{ x: "-500px" }}
    animate={{ x: "0px" }}
    exit={{ x: "-500px" }}
    transition={{ duration: 0.4 }}>
     <button onClick={onClose}><IoIosArrowBack/></button>
     {children}
    </motion.div>
)
}
export default MobileSidebar;