import classes from "./Post.module.scss";
import Appbar from "../../component/appbar/Appbar";
import { motion } from "framer-motion";
import  PostItem from "../../component/posts/post/Post";
const Post = () => {
 

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
         
        </motion.div>
      </main>
    </>
  );
};
export default Post;
