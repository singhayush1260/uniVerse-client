import classes from "./Post.module.scss";
import { useState, useRef, useEffect } from "react";
import { PiShareFat } from "react-icons/pi";
import { IoEllipsisVertical } from "react-icons/io5";
import { LiaHeartSolid } from "react-icons/lia";
import { FaRegCommentDots } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import { useSelector } from 'react-redux';
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import LazyImage from "../../lazy-image/LazyImage";
import Comments from "../../comments/Comments";
import { useMutation, useQueryClient } from "react-query";
import {
  deletePost as deletePostApi,
  updatePost as updatePostApi,
} from "../../../api/post";
import { toast } from "react-toastify";
import CircularLoader from "../../../component/loaders/circular-loader/CircularLoader";
const Post = ({ name, userId, postId, caption, image, timestamp }) => {
  const {userData}=useSelector((state)=>state.userReducer);
  const [showComments, setShowComments] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTextArea, setShowTextArea] = useState(false);
  const [updatedCaption, setUpdatedCaption] = useState(caption ||"");
  const dropdownRef = useRef();
  const queryClient = useQueryClient();
//console.log("image from post",image)
//console.log("postId",postId)
  const {
    mutate: deletePost,
    isLoading: isDeleting,
    isDeletingError,
    deletingError,
  } = useMutation(deletePostApi, {
    onSuccess: (data) => {
      console.log("delete post success", data);
      queryClient.invalidateQueries("getAllPosts");
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
    isUpdatingError,
    updatingError,
  } = useMutation(updatePostApi, {
    onSuccess: (data) => {
      console.log("update post success", data);
      queryClient.invalidateQueries("getAllPosts");
      setShowTextArea(false);
    },
    onError: (error) => {
      console.log("update post error", error);
    },
  });

  // const updatePost = () => {
  //   setShowTextArea(true);
  // };

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
          <LazyImage src="https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532" />
          <div className={classes.group}>
            <a>{name}</a>
            <span className={classes.userId}>@{userId}</span>
            <span> {formatDistanceToNow(timestamp, { addSuffix: true })}</span>
          </div>
        </div>
      { userId===userData._id && <IoEllipsisVertical onClick={() => setShowDropdown(!showDropdown)} />}
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
          <LiaHeartSolid />
          <FaRegCommentDots onClick={() => setShowComments(!showComments)} />
          <PiShareFat />
        </div>
       <div className={classes.button_group}>
       { showTextArea && <button onClick={()=>{ setUpdatedCaption(caption); setShowTextArea(false)}}>Cancel</button>}
        { showTextArea && <button onClick={()=>updatePost({postId,updatedCaption})}>Done</button>}
       </div>
      </div>
      <div className={classes.add_comment}>
        <div className={classes.image_container}>
          <img
            src="https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532"
            alt="user"
          />
        </div>
        <div className={classes.input_controller}>
          <textarea cols="30" rows="1" placeholder="Write a comment!" />
          <BsEmojiSmile />
        </div>
      </div>
      {showComments && <Comments postId={postId} />}
    </div>
  );
};
export default Post;
