import classes from "./MyFriends.module.scss";
import { useSelector } from "react-redux";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import SearchDialog from "../../dialogs/search-dialog/SearchDialog";
import LazyImage from "../../lazy-image/LazyImage";
const MyFriends = () => {

  const[showDialog, setShowDialog]=useState(false);

  const { friends }=useSelector((state)=>state.friendsReducer);
  
  return (
    <div className={classes.list_widget}>
      <div className={classes.widget_header}>
      <h1>My Friends</h1>
      <div className={classes.icon_group}>
        <IoIosSearch onClick={()=>setShowDialog(true)}/>
      </div>
      </div>
      <div className={classes.list}>
      {
        friends.slice(0,4).map((friend)=>{
          return  <div className={classes.list_item} key={friend.userId}>
          <div className={classes.image_container}>
            {/* <img src={friend.profile_picture} alt={friend.name} /> */}
            <LazyImage src={friend.profile_picture}/>
          </div>
          <div className={classes.list_item_detail}>
              <span>{friend.name}</span>
              <span>Last seen {formatDistanceToNow(friend?.lastSeen, { addSuffix: true,})}</span>
          </div>
         </div>
        })
      }
      </div>
      { showDialog && <SearchDialog dialogLabel="Friends" data={friends} showDialog={showDialog} setShowDialog={setShowDialog}/> }
    </div>
  );
};
export default MyFriends;

