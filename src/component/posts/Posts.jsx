import classes from "./Posts.module.scss";
import Post from "./post/Post";
import { useQuery } from "react-query";
import { getAllPosts } from "../../api/post";
import PostSkeleton from "../loaders/skeleton/post-skeleton/PostSkeleton";

const Posts = () => {
  const {data,isLoading,error, refetch}=useQuery("getAllPosts",getAllPosts);
  return (
    <div className={classes.posts}>
       {isLoading && Array.from({ length: 5 }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
      {
        data?.Posts?.length===0 && <div className={classes.fetch_error}>{data?.message}</div>
      }
      {data?.userPosts?.map(({post,user}) => {
        return (
          <Post
            key={post._id}
            postId={post._id}
            name={user?.Name}
            userName={user?.Username}
            userId={user?._id}
            userAvatar={user?.Avatar}
            caption={post.Caption}
            mediaUrls={post?.MediaURLs}
            timestamp={new Date(post.createdAt)}
          />
        );
      })}
      {
        error && <div className={classes.fetch_error}>
          <img src="/public/universe.svg"/>
          <p>Opps!</p>
          <p>Something went wrong!</p>
          <button onClick={()=>refetch()}>Retry</button>
        </div>
      }
    </div>
  );
};
export default Posts;
