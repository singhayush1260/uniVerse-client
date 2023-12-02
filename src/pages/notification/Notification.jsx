import classes from "./Notification.module.scss";
import Appbar from "../../component/appbar/Appbar";
import { useSelector } from "react-redux";
import VerticalList from "../../component/vertical-list/VerticalList";
import { motion } from "framer-motion";
const Notification = () => {
    
  const { notifications } = useSelector((state) => state.notificationReducer);

  return (
    <>
      <Appbar />
      <motion.main className={classes.page_wrapper}
      initial={{ x: "-500px" }}
      animate={{ x: "0px" }}
      exit={{ x: 0 }}
      transition={{ duration: 0.5 }}
>
        <VerticalList listData={notifications} />
      </motion.main>
    </>
  );
};
export default Notification;
