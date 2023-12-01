import classes from "./Comments.module.scss";
import { useSelector } from "react-redux";
import Comment from "./comment/Comment";
const Comments = ({ postId }) => {
  const { comments } = useSelector((state) => state.commentsReducer);

  const rootComments = comments.filter((comment) => comment.parentId === null);

  const getReplies = (parentId) => {
    const replies = comments
      .filter((comment) => comment.parentId === parentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    return replies;
  };

  return (
    <div className={classes.comments_wrapper}>
      {rootComments.map((rootComment) => {
        return (
          <Comment
            key={rootComment.commentId}
            comment={rootComment}
            replies={getReplies(rootComment.commentId)}
          />
        );
      })}
    </div>
  );
};
export default Comments;
