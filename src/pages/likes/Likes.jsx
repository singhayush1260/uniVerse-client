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
      <main className={classes.page_wrapper}>
        <motion.div
          initial={{ x: "-500px" }}
          animate={{ x: "-5px" }}
          exit={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VerticalList listData={likes} />
        </motion.div>
      </main>
    </>
  );
};
export default Likes;
