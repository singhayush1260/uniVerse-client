import classes from "./Comments.module.scss";
import Comment from "./comment/Comment";
import { useQuery} from "react-query";
import { getAllComments } from "../../api/comment";
const Comments = ({ postId,currentUser }) => {

  const{data,isLoading,error}=useQuery(["getAllComments",postId],()=>getAllComments(postId),{
    enabled:!!postId,
  });
  const rootComments = data?.comments.filter((commentData) => commentData?.comment?.Parent === null);

  return (
    <div className={classes.comments_wrapper}>
      {data?.comments?.length===0 && <div className={classes.no_comment}>No comment.</div>}
      {isLoading && <div className={classes.loading_comments}>
        <span>Loading comments</span>
        </div>}
        {
          !isLoading && error && <div className={classes.error}>
            Could not fetch comments
          </div>
        }
      {!isLoading && rootComments?.map((rootComment) => {
        return (
          <Comment
          postId={postId}
            key={rootComment.commentId}
            comment={rootComment}
            currentUser={currentUser}
          />
        );
      })}
    </div>
  );
};
export default Comments;
