import classes from "./Likes.module.scss";
import Appbar from "../../component/appbar/Appbar";
import { useSelector } from "react-redux";
import VerticalList from "../../component/vertical-list/VerticalList";
import { motion } from "framer-motion";
const Likes = () => {
    
  const { likes } = useSelector((state) => state.likesReducer);

  return (
    <>
      <Appbar />
      <motion.main className={classes.page_wrapper}
      initial={{ x: "-500px" }}
      animate={{ x: "0px" }}
      exit={{ x: 0 }}
      transition={{ duration: 0.5 }}
>
        <VerticalList listData={likes} />
      </motion.main>
    </>
  );
};
export default Likes;
