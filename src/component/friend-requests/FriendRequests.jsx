import classes from "./FriendRequests.module.scss";
import { useQuery,useMutation } from "react-query";
import { Link } from "react-router-dom";
import LazyImage from "../lazy-image/LazyImage";
import { getAllRequests } from "../../api/friend";
import { acceptRequest,declineRequest } from "../../api/friend";
import { FaUserFriends } from "react-icons/fa";
import CircularLoader from "../loaders/circular-loader/CircularLoader";
import USER_FALLBACK from "../../assets/images/dummy_user.png";

const FriendRequests = () => {
  const { data, isLoading, error } = useQuery("getAllRequests", getAllRequests);
  const{mutate:acceptReq,isLoading:acceptingReq,error:acceptingReqError}=useMutation(acceptRequest,{
    onSuccess:(data)=>{
      console.log("accept req success",data);
    }
  });
  const{mutate:declineReq,isLoading:decliningReq,error:decliningReqError}=useMutation(declineRequest,{
    onSuccess:(data)=>{
      console.log("decline req success",data);
    }
  });

  return (
    <div className={classes.friend_requests}>
      <h4>
        <FaUserFriends /> Friend Requests
      </h4>
      {error && <div className={classes.error}>Something went wrong.</div>}
      {!error && data?.requests?.length == 0 && (
        <div className={classes.not_found}>
          <span>No request found.</span>
        </div>
      )}
      <div className={classes.friend_requests_list}>
        {isLoading &&
          Array.from({ length: 3 }).map((i) => {
            return (
              <div className={classes.user_skeleton} key={i}>
                <div className={classes.img}></div>
                <div className={classes.detail}>
                  <div></div>
                </div>
              </div>
            );
          })}
        {!isLoading &&
          !error &&
          data?.requests?.length > 0 &&
          data?.requests.map((req) => {
            return (
              <div className={classes.friend_requests_item}>
                <div>
                  <LazyImage src={req?.Requester.Avatar || USER_FALLBACK} />
                  <Link to={`/user/${req?.Requester.Username}`}>
                    {req?.Requester.Name}
                  </Link>
                </div>
                <div>
                  <button onClick={()=>acceptReq(req?._id)} disabled={acceptingReq}>{acceptingReq ? <CircularLoader/>: "Accept"}</button>
                  <button onClick={()=>declineReq(req?._id)} disabled={decliningReq}>{decliningReq ? <CircularLoader/> : "Decline"}</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default FriendRequests;
