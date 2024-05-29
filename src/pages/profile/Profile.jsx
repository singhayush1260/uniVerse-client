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
import { IoIosLock } from "react-icons/io";

const Profile = () => {

  const[showPostModal,setShowPostModal]=useState(false);
  const[modalPost,setModalPost]=useState(null);
  const[currentCarouselItem,setCurrentCarouselItem]=useState(1);
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

const isPrivate=false;
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
          </div>
          <div className={classes.bottom_right}>
          {isPrivate && <div className={classes.private_account}>
            <section>
            <IoIosLock/>
            <div>Account is private.</div>
            <p>Add friend to view posts.</p>
            </section>
            </div>
      }
          {!isPrivate && <>
          <div className={classes.bottom_right_appbar}>
              <div className={classes.carousal_controller}>
                <div className={currentCarouselItem===1 && classes.current_carousal_item} onClick={()=>setCurrentCarouselItem(1)}>
                  Post
                  <span>
                    <b>12</b>
                  </span>
                </div>
                <div className={currentCarouselItem===2 && classes.current_carousal_item} onClick={()=>setCurrentCarouselItem(2)}>
                  Photos
                  <span>
                    <b>31</b>
                  </span>
                </div>
                
              </div>
            </div>
            <div className={classes.data_grid}>
              {data?.Posts?.map((post) => {
                //console.log("post",post)
                return (
                  <div className={classes.grid_item} key={post.postId} onClick={()=>{setModalPost(post); setShowPostModal(true)}}>
                    <p>{ post?.Caption?.length>80 ? post?.Caption?.slice(0,60)+"...":post?.Caption}</p>
                    {
                      post?.MediaURLs?.length>0 && post?.MediaURLs?.map((url)=>{
                        return <div className={classes.post_image_container}>
                          <img src={url}
                        alt={`${post.userId}-${post.postId}`} />
                        </div>
                      })
                    }
                  </div>
                );
              })}
            </div>
          </>}
          </div>
        </div>
          {showPostModal && <Modal isOpened={showPostModal} onClose={()=>setShowPostModal(false)}>
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
