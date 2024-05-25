import classes from "./Post.module.scss";
import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from 'react-redux';
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { toast } from "react-toastify";
import { PiShareFat } from "react-icons/pi";
import { IoEllipsisVertical } from "react-icons/io5";
import { LiaHeartSolid } from "react-icons/lia";
import { FaRegCommentDots } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import {
  deletePost as deletePostApi,
  updatePost as updatePostApi,
} from "../../../api/post";
import CircularLoader from "../../../component/loaders/circular-loader/CircularLoader";
import Modal from "../../modal/Modal";
import LazyImage from "../../lazy-image/LazyImage";
import Comments from "../../comments/Comments";
import SocialShare from "../../widgets/social-share/SocialShare";
import EmojiPicker from 'emoji-picker-react';
import USER_FALLBACK from "../../../assets/images/dummy_user.png";

const Post = ({ name, userName, userId, userAvatar, postId, caption, image, timestamp }) => {
  const {userData}=useSelector((state)=>state.userReducer);
  const [showComments, setShowComments] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showTextArea, setShowTextArea] = useState(false);
  const [updatedCaption, setUpdatedCaption] = useState(caption ||"");
  const dropdownRef = useRef();
  const queryClient = useQueryClient();
  const {
    mutate: deletePost,
    isLoading: isDeleting,
  } = useMutation(deletePostApi, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries("getAllPosts");
    },
    onError: (error) => {
      console.log("delete post error", error);
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
    <div className={classes.post_wrapper}>
      <div className={classes.post_header}>
        <div className={classes.user_detail}>
          <LazyImage src={userAvatar || USER_FALLBACK} />
          <div className={classes.group}>
            <a>{name}</a>
            <span className={classes.userId}>@{userName}</span>
            <span> {formatDistanceToNow(timestamp, { addSuffix: true })}</span>
          </div>
        </div>
      { userId===userData?._id && <IoEllipsisVertical onClick={() => setShowDropdown(!showDropdown)} />}
        {showDropdown && (
          <div className={classes.dropdown} ref={dropdownRef}>
            <span onClick={() =>  setShowTextArea(true)}>
              {isUpdating ? <CircularLoader /> : "Update"}
            </span>
            <span onClick={() => deletePost(postId)}>
              {isDeleting ? <CircularLoader /> : "Delete"}
            </span>
          </div>
        )}
      </div>
      {!showTextArea && <p className={classes.caption}>{caption}</p>}
      {showTextArea && <textarea autoFocus cols="30" rows="1" className={classes.update_caption} value={updatedCaption} onChange={(e)=>setUpdatedCaption(e.target.value)}  />}
    {image &&  <div className={classes.post_image}>
        <LazyImage src={image} />
      </div>}
      <div className={classes.post_control}>
        <div className={classes.group}>
          <LiaHeartSolid onClick={()=>setShowEmojiPicker(!showEmojiPicker)} />
          <FaRegCommentDots onClick={() => setShowComments(!showComments)} />
          <PiShareFat onClick={()=>setShowShareModal(!showShareModal)}/>
        </div>
        {showEmojiPicker && <div className={classes.emoji_picker}>
          <EmojiPicker reactionsDefaultOpen={showEmojiPicker} theme="dark"/>
            </div>}
       <div className={classes.button_group}>
       { showTextArea && <button onClick={()=>{ setUpdatedCaption(caption); setShowTextArea(false)}}>Cancel</button>}
        { showTextArea && <button onClick={()=>updatePost({postId,updatedCaption})}>Done</button>}
       </div>
      </div>
      <div className={classes.add_comment}>
        <div className={classes.image_container}>
          <img
            src={USER_FALLBACK}
            alt="current_user"
          />
        </div>
        <div className={classes.input_controller}>
          <textarea cols="30" rows="1" placeholder="Write a comment!" />
          <BsEmojiSmile />
        </div>
      </div>
      {showComments && <Comments postId={postId} />}
      {showShareModal && <Modal isOpened={showShareModal} onClose={()=>setShowShareModal(false)}><SocialShare/> </Modal> }
    </div>
  );
};
export default Post;
