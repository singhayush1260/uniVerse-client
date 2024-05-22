import classes from "./Posts.module.scss";
import { useSelector } from "react-redux";
import Post from "./post/Post";
import { useQuery } from "react-query";
import { getAllPosts } from "../../api/post";
const Posts = () => {
  //const { posts } = useSelector((state) => state.postReducer);
  const {data,error}=useQuery("getAllPosts",getAllPosts);
  console.log("all posts",data)
  return (
    <div className={classes.posts}>
      {data?.Posts?.map((post) => {
        return (
          <Post
            key={post._id}
            postId={post._id}
            name={"Evgen Ledo"}
            userId={post.By}
            caption={post.Caption}
            image={post.MediaURLs[0]}
            timestamp={new Date(post.createdAt)}
          />
        );
      })}
    </div>
  );
};
export default Posts;
