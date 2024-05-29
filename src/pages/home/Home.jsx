import { useQuery } from "react-query";
import AddPost from "../../component/widgets/add-post/AddPost";
import MyFriends from "../../component/widgets/my-friends/MyFriends";
import ProfileOverview from "../../component/widgets/profile-overview/ProfileOverview";
import Stories from "../../component/widgets/stories/Stories";
import Posts from "../../component/posts/Posts";
import UserList from "../../component/widgets/user-list/UserList";
import classes from "./Home.module.scss";
import Appbar from "../../component/appbar/Appbar";
import { getAllCommunityUsers } from "../../api/user";
import useUser from "../../hooks/useUser";
const Home = () => {

  const{user:currentUser}=useUser();

  const{data,isLoading,error}=useQuery("getAllCommunityUsers",getAllCommunityUsers);
 
  return (
    <>
      <Appbar />
      <main className={classes.page_wrapper}>
        <div className={classes.left_sidebar}>
          <ProfileOverview />
          <MyFriends />
        </div>
        <div className={classes.timeline}>
          {/* <Stories /> */}
          <AddPost currentUser={currentUser} />
          <Posts />
        </div>
        <div className={classes.right_sidebar}>
          <UserList heading="Community Users" users={data?.communityUsers} isLoading={isLoading}/>
        </div>
      </main>
    </>
  );
};
export default Home;
