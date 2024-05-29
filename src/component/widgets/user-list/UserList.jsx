import { useNavigate } from "react-router-dom";
import LazyImage from "../../lazy-image/LazyImage";
import classes from "./UserList.module.scss";
import USER_FALLBACK from "../../../assets/images/dummy_user.png";
const UserList=({heading,users,isLoading})=>{

const navigate=useNavigate();
return(
    <div className={classes.user_list_container}>
     <h4>{heading}</h4>
     <div style={{paddingBottom:"0.5em"}}/>
     <div className={classes.user_list}>
     {isLoading && Array.from(5).map((i)=>{
      return  <div className={classes.user_skeleton} key={i}>
      <div className={classes.img}></div>
      <div className={classes.detail}>
      <div></div>
      <div></div>
      </div>
    </div>
     })}
     {!isLoading && users?.map((user)=>{
        return <div className={classes.list_item} onClick={()=>navigate(`/user/${user?._id}`,{state:{user}})}>
         <div className={classes.image_container}>
         <LazyImage src={user?.Avatar || USER_FALLBACK}/>
         </div>
        <div className={classes.user_detail}>
        <p>{user?.Name}</p>
        <p>{user?.Username}</p>
        </div>
        </div>
     })}
     <div style={{paddingTop:"0.5em"}}/>
     </div>
    </div>
)
}
export default UserList;