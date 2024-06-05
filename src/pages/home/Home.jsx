import { useEffect } from "react";
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
import { getFriends } from "../../api/friend";
import useUser from "../../hooks/useUser";
import { useSocketContext } from "../../context/SocketContext";

const Home = () => {

  const{user:currentUser}=useUser();

  const {socket}=useSocketContext();

  const{data,isLoading,error}=useQuery("getAllCommunityUsers",getAllCommunityUsers);

  const{data:friends,isLoading:isFriendsLoading,error:friendsError}=useQuery("getFriends",getFriends);

  const friendsList=friends?.populatedFriends?.map((friend)=>{
    if(friend?.Recipient?._id!==currentUser?._id){
      return friend?.Recipient;
    }
    return friend?.Requester
  })

 
  return (
    <>
      <Appbar />
      <main className={classes.page_wrapper}>
        <div className={classes.left_sidebar}>
          <ProfileOverview />
          <UserList heading="Friends" users={friendsList} isLoading={isFriendsLoading}/>
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
