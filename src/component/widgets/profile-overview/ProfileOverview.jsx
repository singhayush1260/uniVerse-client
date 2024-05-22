import classes from './ProfileOverview.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LazyImage from '../../lazy-image/LazyImage';
import AVARAR_FALLBACK from "../../../assets/images/dummy_user.png";
const ProfileOverview=()=>{
   
   const {userData}=useSelector((state)=>state.userReducer);

   console.log("userData from profile overview",userData);
   const{Avatar}=userData;

   const navigate=useNavigate();

    return <div className={classes.widget_wrapper}>
        <div className={classes.image_container}>
        <div className={classes.cover_pic}>
        {/* <LazyImage src={cover_picture}/> */}
        </div>
           <div className={classes.profile_pic}>
              {/* <img src={profile_picture} alt="user" /> */}
              <LazyImage src={Avatar || AVARAR_FALLBACK}/>
           </div>
        </div>
       <div className={classes.user_detail}>
       <div className={classes.followers}>
             <p>
                <span>{2}</span>
                Followers
             </p>
             <p>
                <span>{4}</span>
                Following
             </p>
        </div>
           <span className={classes.name}>{"ss"}</span>
           <span className={classes.userId}>@{"d"}</span>
           <p className={classes.bio}>{"d"}</p>
           <button onClick={()=>navigate(`/user/${userId}`)}>My Profile</button>
       </div>
    </div>
}
export default ProfileOverview;