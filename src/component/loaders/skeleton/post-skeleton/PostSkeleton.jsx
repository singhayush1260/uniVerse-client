import classes from "./PostSkeleton.module.scss";
import { PiShareFat } from "react-icons/pi";
import { IoEllipsisVertical } from "react-icons/io5";
import { LiaHeartSolid } from "react-icons/lia";
import { FaRegCommentDots } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";

const PostSkeleton = () => {
  return (
    <div className={classes.post_wrapper}>
      <div className={classes.post_header}>
        <div className={classes.user_detail}>
          <div className={classes.image}></div>
          <div className={classes.group}>
            <a></a>
            <span/>
            <span/>
          </div>
        </div>
     <IoEllipsisVertical/>
      </div>
    <div className={classes.post_image}></div>
      <div className={classes.post_control}>
        <div className={classes.group}>
          <LiaHeartSolid />
          <FaRegCommentDots/>
          <PiShareFat />
        </div>
      </div>
      <div className={classes.add_comment}>
        <div className={classes.image_container}>
          <div></div>
        </div>
        <div className={classes.input_controller}>
          <textarea cols="30" rows="1" placeholder="Write a comment!" disabled/>
          <BsEmojiSmile />
        </div>
      </div>
    </div>
  );
};
export default PostSkeleton;
