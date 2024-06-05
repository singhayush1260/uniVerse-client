import classes from "./Comment.module.scss";
import { useState } from "react";
import { useQuery} from "react-query";
import { useSelector } from "react-redux";
import LazyImage from "../../lazy-image/LazyImage";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import AddComment from "../add-comment/AddComment";
import { getReplies } from "../../../api/comment";
const Comment = ({postId, comment, isReply,currentUser }) => {
  const[showAddReply,setShowAddReply]=useState(false);
  const[commentId,setCommentId]=useState("");
  const param={postId,commentId};
  const{data,isLoading,error}=useQuery(["getReplies",param],()=>getReplies(param),{
    enabled:!!commentId,
    onSuccess:async (data)=>{
    }
  });
  return (
    <>
    <div className={classes.comment_container}>
      <div className={classes.user}>
        <LazyImage src={comment?.comment?.Avatar} />
      </div>
      <div className={classes.comment}>
        <p>{comment?.comment?.Message}</p>
        <div className={classes.group}>
          <p>{formatDistanceToNow(new Date(comment?.comment?.createdAt), { addSuffix: true })}</p>
          {/* <span>{`Likes(${comment.totalLikes})`}</span> */}
          {/* <span>Like</span> */}
         {!isReply && <span onClick={()=>setShowAddReply(!showAddReply)}>Reply</span>}
         {!commentId && comment?.totalReplies>0 &&  <span onClick={()=>{setCommentId(comment?.comment?._id)}}>{`Replies(${comment?.totalReplies})`}</span>}
         {commentId && <span onClick={()=>{setCommentId(null)}}>Hide</span>}
        </div>
        {showAddReply && !isReply && <div className={classes.add_comment}>
            <AddComment postId={postId} commentId={comment?.comment?._id} currentUser={currentUser} isReply afterResponse={()=>setShowAddReply(false)}/>
            </div>}
      </div>
    </div>
      <div className={classes.replies}>
      {
       data?.comments?.length>0 &&  data?.comments?.map((reply)=>{
            return <Comment  key={reply.comment?._id} comment={reply} isReply/>
        })
      }
    </div>
    </>
  );
};
export default Comment;
