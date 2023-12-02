import classes from './UserList.module.scss';
import LazyImage from '../../../component/lazy-image/LazyImage';
const UserList=({friends, setCurrentChat, showChatPanel})=>{
    return <div className={`${classes.user_list_container} ${showChatPanel && classes.hide}`}>
      <div className={classes.input_controller}>
          <input type="text" placeholder="Search..." />
      </div>
      <div className={classes.list}>
      {
        friends.map((friend)=>{
            return <div className={classes.user} key={friend.username} onClick={()=>setCurrentChat(friend.username)}>
              <div className={classes.user_image}>
               <LazyImage src={friend.profile_picture}/>
              </div>
              <div className={classes.user_details}>
                <span><b>{friend.name}</b><em> 2d</em></span>
                <span>{friend.username}</span>
              </div>
            </div>
        })
      }
      </div>
    </div>
}
export default UserList;