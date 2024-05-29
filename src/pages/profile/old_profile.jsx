import classes from "./Profile.module.scss";
import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Appbar from "../../component/appbar/Appbar";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import {useQuery,useMutation,useQueryClient} from "react-query";
import { getAllPostsByUser } from "../../api/post";
import { useParams } from "react-router-dom";
import Modal from "../../component/modal/Modal";
import Post from "../../component/posts/post/Post";
import { CiEdit } from "react-icons/ci";
import LazyImage from "../../component/lazy-image/LazyImage";
import UploadPictureCrop from "../../component/widgets/upload-picture-crop/UploadPictureCrop";
import useUser from "../../hooks/useUser";
import USER_FALLBACK from "../../assets/images/dummy_user.png";
import COVER_FALLBACK from "../../assets/images/dummy_cover.png";
import { sendRequest as sendRequestApi } from "../../api/friend";
import CircularLoader from "../../component/loaders/circular-loader/CircularLoader";
import {useSocketContext} from "../../context/SocketContext"
import { toast } from "react-toastify";

const Profile = () => {

  const[showPostModal,setShowPostModal]=useState(false);
  const[modalPost,setModalPost]=useState(null);
  const[showUpdatePictureModal,setShowUpdatePictureModal]=useState(false);
  const queryClient=useQueryClient();
  const navigate=useNavigate();
  const location=useLocation();
  const userId=location?.state?.user?._id;
  const{user:currentUser}=useUser();
  const {user,isFriend,friend}=useUser(userId,"getOtherUser");
  const isRequestSent=friend?.Status===1;
  const isRequestDeclined=friend?.Status===2;
  console.log("friend",friend,isRequestDeclined);
 const {socket}=useSocketContext();
  const { data, error, isLoading } = useQuery(["getAllPostsByUser", userId], () => getAllPostsByUser(userId), {
    enabled: !!userId 
  });
  const {mutate,data:sentRequestResponse,isLoading:sendingRequest}=useMutation(sendRequestApi,{
    onSuccess:(data)=>{
        console.log("requets send success",data);
        queryClient.invalidateQueries("getOtherUser");
    },
    onError:()=>{
      toast("Could not send request.", {
        position: "top-center",
        theme: "dark",
        type: "error",
        autoClose: 3000,
      });
    }
  });

const sendRequest=(userId)=>{
mutate(userId);
}
const createGroup=()=>{
  socket?.emit("create-group",{userID:currentUser?._id,memberIDs:[currentUser?._id,userId]});
  navigate("/messenger")
}
  return (
    <>
      <Appbar />
      <main className={classes.page_wrapper}>
        <div className={classes.top}>
          <div className={classes.cover_picture}>
            <img src={COVER_FALLBACK} alt={`cover_picture_${user?.Name}`} />
            <div className={classes.profile_picture}>
              <LazyImage src={user?.Avatar || USER_FALLBACK} alt={`profile_picture_${user?.Name}`} />
              <CiEdit onClick={()=>setShowUpdatePictureModal(true)}/>
            </div>
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.bottom_left}>
            <h2>{user?.Name}</h2>
            <span>@{user?.Username}</span>
            <p>{""}</p>
            { !isFriend && <button onClick={()=>sendRequest(userId)}>{sendingRequest ? <CircularLoader/> :isRequestSent ?"Request Sent" :"Add Friend"}</button>}
            <button onClick={()=>createGroup()}>Message</button>
            {/* <div className={classes.span_group}>
              <span>
                <b>{2}</b>Followers
              </span>
              <span>
                <b>{4}</b>Following
              </span>
            </div> */}
            {/* <div className={classes.socials}>
              <a>
                {" "}
                <AiFillInstagram /> @evgen_ledo{" "}
              </a>
              <a href="#">
                <FaFacebookSquare /> Evgen Ledo{" "}
              </a>
              <a href="#">
                <FaXTwitter /> @ledo_123{" "}
              </a>
              <a href="#">
                {" "}
                <FaLinkedin />
                Evgen Ledo
              </a>
            </div> */}
          </div>
          <div className={classes.bottom_right}>
            <div className={classes.bottom_right_appbar}>
              <div className={classes.carousal_controller}>
                <div className={classes.current_carousal_item}>
                  Post
                  <span>
                    <b>12</b>
                  </span>
                </div>
                <div>
                  Photos
                  <span>
                    <b>31</b>
                  </span>
                </div>
              </div>
              {/* <div className={classes.button_group}>
                <button><SlUserFollow/> Follow</button>
                <button><TiMessage/>Message</button>
              </div> */}
            </div>
            <div className={classes.data_grid}>
              {data?.Posts?.map((post) => {
                //console.log("post",post)
                return (
                  <div className={classes.grid_item} key={post.postId} onClick={()=>{setModalPost(post); setShowPostModal(true)}}>
                    <p>{ post?.Caption?.length>80 ? post?.Caption?.slice(0,80)+"...":post?.Caption}</p>
                    {
                      post?.MediaURLs?.length>0 && post?.MediaURLs?.map((url)=>{
                        return <img src={url}
                        alt={`${post.userId}-${post.postId}`} />
                      })
                    }
                  </div>
                );
              })}
            </div>
          </div>
        </div>
       {/* {showPostModal && <Modal isOpened={showPostModal} onClose={()=>setShowPostModal(false)}>
           <div style={{position:"relative", height:"90%",overflowY:"scroll",paddingTop:"1rem"}}>
           <div style={{position:"absolute",top:0,right:10,backgroundColor:"black",width:20,height:20,padding:2,textAlign:"center",color:"white",borderRadius:"50%"}} onClick={()=>setShowPostModal(false)}>X</div>
            <Post
            key={modalPost?.id}
            postId={modalPost?.id}
            name={"Evgen Ledo"}
            userId={modalPost?.By}
            caption={modalPost?.Caption}
            image={modalPost?.MediaURLs[0]}
            timestamp={new Date(modalPost?.createdAt)}
          />
            
           </div>
        </Modal>} */}
          {showPostModal && <Modal isOpened={showPostModal} onClose={()=>setShowPostModal(false)}>
           
           {/* <div style={{position:"absolute",top:0,right:10,backgroundColor:"black",width:20,height:20,padding:2,textAlign:"center",color:"white",borderRadius:"50%"}} onClick={()=>setShowPostModal(false)}>X</div> */}
            <Post
            key={modalPost?.id}
            postId={modalPost?.id}
            name={"Evgen Ledo"}
            userId={modalPost?.By}
            caption={modalPost?.Caption}
            image={modalPost?.MediaURLs[0]}
            timestamp={new Date(modalPost?.createdAt)}
          />
        </Modal>}
        {showUpdatePictureModal && <Modal isOpened={showUpdatePictureModal} onClose={()=>setShowUpdatePictureModal(false)}>
          <UploadPictureCrop/>
        </Modal>}
      </main>
    </>
  );
};
export default Profile;
