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
      <main className={classes.page_wrapper}>
        <motion.div
          initial={{ x: "-500px" }}
          animate={{ x: "-5px" }}
          exit={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VerticalList listData={notifications} />
        </motion.div>
      </main>
    </>
  );
};
export default Notification;
