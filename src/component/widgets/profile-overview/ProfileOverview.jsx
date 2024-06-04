import classes from './ProfileOverview.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LazyImage from '../../lazy-image/LazyImage';
import USER_FALLBACK from "../../../assets/images/dummy_user.png";
import COVER_FALLBACK from "../../../assets/images/dummy_cover.png";
import useUser from '../../../hooks/useUser';

const ProfileOverview=()=>{
   
   const {userData}=useSelector((state)=>state.userReducer);

   const { user }=useUser();



   const navigate=useNavigate();

    return <div className={classes.widget_wrapper}>
        <div className={classes.image_container}>
        <div className={classes.cover_pic}>
        <LazyImage src={COVER_FALLBACK}/>
        </div>
           <div className={classes.profile_pic}>
              {/* <img src={profile_picture} alt="user" /> */}
              <LazyImage src={user?.Avatar || USER_FALLBACK}/>
           </div>
        </div>
       <div className={classes.user_detail}>
       {/* <div className={classes.followers}>
             <p>
                <span>{2}</span>
                Followers
             </p>
             <p>
                <span>{4}</span>
                Following
             </p>
        </div> */}
           <span className={classes.name}>{user?.Name}</span>
           <span className={classes.userId}>@{user?.Username}</span>
           <p className={classes.bio}>{user?.Bio}</p>
           <button onClick={()=>navigate(`/user/${user?.Username}`, { state: { user } })}>My Profile</button>
       </div>
    </div>
}
export default ProfileOverview;