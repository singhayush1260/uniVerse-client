import classes from './ProfileOverview.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LazyImage from '../../lazy-image/LazyImage';
const ProfileOverview=()=>{
   
   const {userData : {name, userId, profile_picture, cover_picture, bio, followers, following}}=useSelector((state)=>state.userReducer);

   const navigate=useNavigate();

    return <div className={classes.widget_wrapper}>
        <div className={classes.image_container}>
        <div className={classes.cover_pic}>
        <LazyImage src={cover_picture}/>
        </div>
           <div className={classes.profile_pic}>
              {/* <img src={profile_picture} alt="user" /> */}
              <LazyImage src={profile_picture}/>
           </div>
        </div>
       <div className={classes.user_detail}>
       <div className={classes.followers}>
             <p>
                <span>{followers}</span>
                Followers
             </p>
             <p>
                <span>{following}</span>
                Following
             </p>
        </div>
           <span className={classes.name}>{name}</span>
           <span className={classes.userId}>@{userId}</span>
           <p className={classes.bio}>{bio}</p>
           <button onClick={()=>navigate(`/user/${userId}`)}>My Profile</button>
       </div>
    </div>
}
export default ProfileOverview;