import classes from "./Comment.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import LazyImage from "../../lazy-image/LazyImage";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
const Comment = ({ comment, replies }) => {

  const[showReplies, setShowReplies]=useState(false);

  return (
    <>
    <div className={classes.comment_container}>
      <div className={classes.user}>
        <LazyImage src="https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532" />
      </div>
      <div className={classes.comment}>
        <p>{comment.commentBody}</p>
        <div className={classes.group}>
          <p>{formatDistanceToNow(comment?.createdAt, { addSuffix: true })}</p>
          <span>{`Likes(${comment.likesCount})`}</span>
          <span>Like</span>
          <span onClick={()=>setShowReplies(!showReplies)}>Reply</span>
        </div>
      </div>
    </div>
      <div className={classes.replies}>
      {
       showReplies && replies.length > 0 && replies.map((reply)=>{
          console.log(reply)
            return <Comment  key={reply.commentId} comment={reply} replies={[]}/>
        })
      }
    </div>
    </>
  );
};
export default Comment;
