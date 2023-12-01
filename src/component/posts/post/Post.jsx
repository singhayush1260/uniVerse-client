import classes from "./Post.module.scss";
import { useState } from "react";
import { PiShareFat } from "react-icons/pi";
import { IoEllipsisVertical} from "react-icons/io5";
import { LiaHeartSolid } from "react-icons/lia";
import { FaRegCommentDots } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import LazyImage from "../../lazy-image/LazyImage";
import Comments from "../../comments/Comments";
const Post = ({name, userId, postId,caption, image, timestamp}) => {
  

  const[showComments, setShowComments]=useState(false);


  return (
    <div className={classes.post_wrapper}>
     <div className={classes.post_header}>
     <div className={classes.user_detail}>
        <LazyImage src="https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532"/>
        <div className={classes.group}>
        <a>{name}</a>
        <span className={classes.userId}>@{userId}</span>
        <span> {formatDistanceToNow(timestamp, {addSuffix: true,})}</span>
        </div>
      </div>
      <IoEllipsisVertical/>
     </div>
      <p className={classes.caption}>{caption}</p>
      <div className={classes.post_image}>
          <LazyImage src={image}/>
      </div>
      <div className={classes.post_control}>
        <div className={classes.group}>
          <LiaHeartSolid />
          <FaRegCommentDots onClick={()=>setShowComments(!showComments)}/>
          <PiShareFat />
        </div>
        <button>Reply</button>
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
     { showComments && <Comments postId={postId}/> }
    </div>
  );
};
export default Post;
