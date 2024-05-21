import classes from "./Notification.module.scss";
import Appbar from "../../component/appbar/Appbar";
import { useSelector } from "react-redux";
import VerticalList from "../../component/vertical-list/VerticalList";
const Notification = () => {
    
  const { notifications } = useSelector((state) => state.notificationReducer);

  return (
    <>
      <Appbar />
      <main className={classes.page_wrapper}>
        <VerticalList listData={notifications} />
      </main>
    </>
  );
};
export default Notification;
