import classes from "./Post.module.scss";
import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { toast } from "react-toastify";
import useUser from "../../../hooks/useUser";
import { PiShareFat } from "react-icons/pi";
import { IoEllipsisVertical } from "react-icons/io5";
import { LiaHeartSolid } from "react-icons/lia";
import { FaRegCommentDots } from "react-icons/fa";
import {
  deletePost as deletePostApi,
  updatePost as updatePostApi,
} from "../../../api/post";
import CircularLoader from "../../../component/loaders/circular-loader/CircularLoader";
import Modal from "../../modal/Modal";
import LazyImage from "../../lazy-image/LazyImage";
import Comments from "../../comments/Comments";
import SocialShare from "../../widgets/social-share/SocialShare";
import USER_FALLBACK from "../../../assets/images/dummy_user.png";
import Reaction from "../../widgets/reaction/Reaction";
import { getReaction } from "../../../api/react";
import {motion} from "framer-motion";
import ImageSlider from "../../image-slider/ImageSlider";
import AddComment from "../../comments/add-comment/AddComment";

const Post = ({ name, userName, userId, userAvatar, postId, caption, mediaUrls, timestamp }) => {
  const[images,setImages]=useState(mediaUrls);
  const [showComments, setShowComments] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showTextArea, setShowTextArea] = useState(false);
  const [updatedCaption, setUpdatedCaption] = useState(caption ||"");
  const[reaction,setReaction]=useState("");
  const dropdownRef = useRef();
  const {user}=useUser();
  const queryClient = useQueryClient();


  const{data,isLoading:isReacting,error}=useQuery(["getPostReaction",postId],()=>getReaction(postId),{
    enabled:!!postId,
    onSuccess:()=>{
      queryClient.invalidateQueries("getAllPosts");
    }
  });


  const {
    mutate: deletePost,
    isLoading: isDeleting,
  } = useMutation(deletePostApi, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries("getAllPosts");
    },
    onError: (error) => {
      toast("Error deleting post!",{
        position:"top-center",
        theme:"dark",
        type:"error",
        autoClose:3000
       })
    },
  });


  const {
    mutate: updatePost,
    isLoading: isUpdating,
  } = useMutation(updatePostApi, {
    onSuccess: async (data) => {
     await queryClient.invalidateQueries("getAllPosts");
      setShowTextArea(false);
    },
    onError: (error) => {
      toast("Error updating post!",{
        position:"top-center",
        theme:"dark",
        type:"error",
        autoClose:3000
       })
    },
  });
 

  useEffect(() => {
    const clickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", clickOutside, true);
    return () => document.removeEventListener("click", clickOutside, true);
  }, []);

  return (
    <motion.div className={classes.post_wrapper}  initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    variants={{
      visible: { opacity: 1, scale: 1 },
      hidden: { opacity: 0, scale: 0 }
    }}>
      <div className={classes.post_header}>
        <div className={classes.user_detail}>
          <LazyImage src={userAvatar || USER_FALLBACK} />
          <div className={classes.group}>
            <a>{name}</a>
            <span className={classes.userId}>@{userName}</span>
            <span> {formatDistanceToNow(timestamp, { addSuffix: true })}</span>
          </div>
        </div>
      { userId===user?._id && <IoEllipsisVertical onClick={() => setShowDropdown(!showDropdown)} />}
        {showDropdown && (
          <div className={classes.dropdown_container} ref={dropdownRef} >
            <span onClick={() =>  setShowTextArea(true)}>
              {isUpdating ? <CircularLoader /> : "Update"}
            </span>
            <span onClick={() => deletePost(postId)}>
              {isDeleting ? <CircularLoader /> : "Delete"}
            </span>
            {/* <DropdownMenu menu={menu} showDropdownArg={showDropdown} onClose={()=>setShowDropdown(false)}/> */}
          </div>
        )}
      </div>
      {!showTextArea && <p className={classes.caption} style={!showFullCaption ? {textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"}:{}}>{caption}</p>}
     { !showFullCaption && <small onClick={()=>setShowFullCaption(true)}>show more</small>}
     {showFullCaption && <small onClick={()=>setShowFullCaption(false)}>show less</small>}
      {showTextArea && <textarea autoFocus cols="30" rows="1" className={classes.update_caption} value={updatedCaption} onChange={(e)=>setUpdatedCaption(e.target.value)}  />}
    {images?.length >0 &&  <div className={classes.post_image}>
       {/* {images.map((image)=> <LazyImage src={image} />)} */}
       <ImageSlider images={images}/>
      </div>}
      <div className={classes.post_control}>
        <div className={classes.group}>
          {/* <LiaHeartSolid onClick={()=>setShowEmojiPicker(!showEmojiPicker)} /> */}
          <span onClick={()=>setShowEmojiPicker(!showEmojiPicker)}>{isReacting ? <CircularLoader/> : (data?.likes[0]?.Reaction || <LiaHeartSolid/>)}</span>
          {/* <img onClick={()=>setShowEmojiPicker(!showEmojiPicker)} src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f603.png"/> */}
          <FaRegCommentDots onClick={() => setShowComments(!showComments)} />
          <PiShareFat onClick={()=>setShowShareModal(!showShareModal)}/>
        </div>
        {showEmojiPicker && <Reaction parentId={postId} reactionsDefaultOpen={showEmojiPicker} setReaction={setReaction} onClose={()=>setShowEmojiPicker(false)}/>}
       <div className={classes.button_group}>
       { showTextArea && <button onClick={()=>{ setUpdatedCaption(caption); setShowTextArea(false)}}>Cancel</button>}
        { showTextArea && <button onClick={()=>updatePost({postId,updatedCaption})}>Done</button>}
       </div>
      </div>
      <AddComment currentUser={user} postId={postId} expandComments={()=>setShowComments(true)}/>
      {showComments && <Comments postId={postId} currentUser={user} />}
      {showShareModal && <Modal isOpened={showShareModal} onClose={()=>setShowShareModal(false)}><SocialShare/> </Modal> }
    </motion.div>
  );
};
export default Post;
