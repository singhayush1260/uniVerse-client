import classes from "./Profile.module.scss";
import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import {useQuery,useMutation,useQueryClient} from "react-query";
import { toast } from "react-toastify";
import useUser from "../../hooks/useUser";
import {useSocketContext} from "../../context/SocketContext"
import { getAllPostsByUser } from "../../api/post";
import { sendRequest as sendRequestApi } from "../../api/friend";
import { CiEdit } from "react-icons/ci";
import { IoIosLock } from "react-icons/io";
import { TfiLayoutMediaOverlay, TfiVideoClapper } from "react-icons/tfi";
import Appbar from "../../component/appbar/Appbar";
import Modal from "../../component/modal/Modal";
import Post from "../../component/posts/post/Post";
import LazyImage from "../../component/lazy-image/LazyImage";
import UploadPictureCrop from "../../component/widgets/upload-picture-crop/UploadPictureCrop";
import CircularLoader from "../../component/loaders/circular-loader/CircularLoader";
import USER_FALLBACK from "../../assets/images/dummy_user.png";
import COVER_FALLBACK from "../../assets/images/dummy_cover.png";
import ProfileSkeleton from "./ProfileSkeleton";
import ImageSlider from "../../component/image-slider/ImageSlider";

const Profile = () => {
  
  const[postsData,setPostsData]=useState([]);
  const[modalPost,setModalPost]=useState(null);
  const[currentCarouselItem,setCurrentCarouselItem]=useState(1);
  const[showUpdatePictureModal,setShowUpdatePictureModal]=useState(false);
  const queryClient=useQueryClient();
  const navigate=useNavigate();
  const location=useLocation();
  const userId=location?.state?.user?._id;
  const {socket}=useSocketContext();
  const{user:currentUser,isLoading:isLoadingCurrentUser}=useUser();
  const {user,isFriend,friend,isLoading:isLoadingUser}=useUser(userId,"getOtherUser");
  const isRequestSent=friend?.Status===1;
  const isRequestDeclined=friend?.Status===2;
 
  const { error, isLoading:isLoadingPosts } = useQuery(["getAllPostsByUser", userId], () => getAllPostsByUser(userId), {
    enabled: !!userId,
    onSuccess:(data)=>{
      setPostsData(data?.userPosts);
    }
  });
  const {mutate,isLoading:sendingRequest}=useMutation(sendRequestApi,{
    onSuccess:()=>{
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
if(isLoadingUser || isLoadingPosts){
  return <ProfileSkeleton/>
}

console.log("userId",userId);
console.log("currentUser",currentUser?._id);

console.log("!(userId===currentUser?._id)",!(userId===currentUser?._id));
console.log("isFriend",isFriend)
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
            <p>{user?.Bio}</p>
            {  (!(userId===currentUser?._id) && !isFriend) && <button onClick={()=>sendRequest(userId)}>{sendingRequest ? <CircularLoader/> :isRequestSent ?"Request Sent" :"Add Friend"}</button>}
           { !(userId===currentUser?._id) && <button onClick={()=>createGroup()}>Message</button>  }
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
                    <b>{postsData?.length}</b>
                  </span>
                </div>
                <div className={currentCarouselItem===2 && classes.current_carousal_item} onClick={()=>setCurrentCarouselItem(2)}>
                  Videos
                  <span>
                    <b>0</b>
                  </span>
                </div>
                
              </div>
            </div>
            <div className={classes.data_grid}>
              {currentCarouselItem===2 && <div>
                <TfiVideoClapper/>
                No video found.
                </div>}
              {currentCarouselItem===1 &&  postsData?.length ==0 && <div>
                <TfiLayoutMediaOverlay/>
                No post found.</div>}
              {currentCarouselItem===1 && postsData?.length!==0 && postsData?.map((pd) => {
                return (
                  <div className={classes.grid_item} key={pd?.post?.postId} onClick={()=>{setModalPost(pd)}}>
                   {pd?.post?.Caption?.length >0 && <p >{pd?.post?.Caption?.length >60 ?pd?.post?.Caption?.substring(60) : pd?.post?.Caption}</p>}
                    {/* {
                      pd?.post?.MediaURLs?.length>0 && pd?.post?.MediaURLs?.map((url)=>{
                        return <div className={classes.post_image_container}>
                          <LazyImage src={url}
                        alt={`${pd?.post?.userId}-${pd?.post?.postId}`} />
                        </div>
                      })
                    } */}
                    <div className={classes.post_image_container}>
                          <LazyImage src={pd?.post?.MediaURLs[0]}
                        alt={`${pd?.post?.userId}-${pd?.post?.postId}`} />
                     { pd?.post?.MediaURLs?.length >1 &&  <div className={classes.image_overlay}>{pd?.post?.MediaURLs?.length}</div>}
                        </div>
                    {/* <ImageSlider images={pd?.post?.MediaURLs}/> */}
                  </div>
                );
              })}
            </div>
          </>}
          </div>
        </div>
          {modalPost && <Modal isOpened={modalPost} onClose={()=>setModalPost(null)}>
            <Post
            key={modalPost?.post?._id}
            postId={modalPost?.post?._id}
            name={modalPost?.user?.Name}
            userAvatar={modalPost?.user?.Avatar}
            userName={modalPost?.user?.Username}
            userId={currentUser?._id}
            caption={modalPost?.post?.Caption}
            mediaUrls={modalPost?.post?.MediaURLs}
            timestamp={new Date(modalPost?.post?.createdAt)}
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
