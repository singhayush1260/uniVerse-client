import classes from "./MobileSidebar.module.scss";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";

const MobileSidebar = ({ children, onClose }) => {
  console.log("MobileSidebar rendered"); // Check if the component is being rendered

  return (
    <motion.div
      className={classes.mobile_sidebar}
      initial={{ x: "-500px" }}
      animate={{ x: "0px" }}
      exit={{ x: "-500px" }}
      transition={{ duration: 0.4 }}
    > 
      <button onClick={() => { 
        console.log("Sidebar close button clicked"); // Log button click
        onClose();
      }}>
        <IoIosArrowBack />
      </button>
      {children}
    </motion.div>
  );
};

export default MobileSidebar;
