import AddPost from "../../component/widgets/add-post/AddPost";
import MyFriends from "../../component/widgets/my-friends/MyFriends";
import ProfileOverview from "../../component/widgets/profile-overview/ProfileOverview";
import Stories from "../../component/widgets/stories/Stories";
import Posts from "../../component/posts/Posts";
import classes from "./Home.module.scss";
import Appbar from "../../component/appbar/Appbar";
import { motion } from "framer-motion";
const Home = () => {
  return (
    <>
      <Appbar />
      <motion.main className={classes.page_wrapper}
   
>
        <div className={classes.left_sidebar}>
          <ProfileOverview />
          <MyFriends />
        </div>
        <div className={classes.timeline}>
          <Stories />
          <AddPost />
          <Posts />
        </div>
        <div className={classes.right_sidebar}>
          <MyFriends />
        </div>
      </motion.main>
    </>
  );
};
export default Home;
