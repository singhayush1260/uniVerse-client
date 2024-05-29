import LazyImage from "../lazy-image/LazyImage";
import classes from "./FriendRequests.module.scss";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import USER_FALLBACK from "../../assets/images/dummy_user.png";
import { getAllRequests } from "../../api/friend";
import { FaUserFriends } from "react-icons/fa";
const FriendRequests=()=>{

const{data,isLoading,error}=useQuery("getAllRequests",getAllRequests);

console.log("requests",data);

const requests=[1,2,3,4,5,6,7,8];

const navigate=useNavigate();

return(
    <div className={classes.friend_requests}>
      <h4>  <FaUserFriends/> Friend Requests</h4>
      {data?.requests?.length==0 && <div className={classes.not_found}>
        
         <span>No request found.</span>
        </div>}
      <div className={classes.friend_requests_list}>
         {data?.requests?.length>0 && requests.map((request)=>{
            return <div className={classes.friend_requests_item}>
            <div>
                <LazyImage src={USER_FALLBACK}/>
                <p onClick={()=>navigate(`/user/${"22"}`)}>Neeraj Sharma</p>
            </div>
            <div>
                <button>Accept</button>
                <button>Decline</button>
            </div>
         </div>
         })}
      </div>
    </div>
)
}
export default FriendRequests;