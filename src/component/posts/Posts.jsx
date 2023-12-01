import classes from "./Posts.module.scss";
import { useSelector } from "react-redux";
import Post from "./post/Post";
const Posts = () => {
  const { posts } = useSelector((state) => state.postReducer);
  return (
    <div className={classes.posts}>
      {posts.map((post) => {
        return (
          <Post
            key={post.postId}
            name={post.name}
            userId={post.userId}
            caption={post.caption}
            image={post.image}
            timestamp={post.timestamp}
          />
        );
      })}
    </div>
  );
};
export default Posts;
