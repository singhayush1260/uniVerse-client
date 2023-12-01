import classes from "./Profile.module.scss";
import { useSelector } from "react-redux";
import Appbar from "../../component/appbar/Appbar";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const Profile = () => {
  
  const { userData: { name,  userId, profile_picture, cover_picture, bio, followers, following, } } = useSelector((state) => state.userReducer);

  const { posts } = useSelector((state) => state.postReducer);

  return (
    <>
      <Appbar />
      <main className={classes.page_wrapper}>
        <div className={classes.top}>
          <div className={classes.cover_picture}>
            <img src={cover_picture} alt={`cover_picture_${name}`} />
            <div className={classes.profile_picture}>
              <img src={profile_picture} alt={`profile_picture_${name}`} />
            </div>
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.bottom_left}>
            <h2>{name}</h2>
            <span>@{userId}</span>
            <p>{bio}</p>
            <button>Edit Profile</button>
            <div className={classes.span_group}>
              <span>
                <b>{followers}</b>Followers
              </span>
              <span>
                <b>{following}</b>Following
              </span>
            </div>
            <div className={classes.socials}>
              <a>
                {" "}
                <AiFillInstagram /> @evgen_ledo{" "}
              </a>
              <a href="#">
                <FaFacebookSquare /> Evgen Ledo{" "}
              </a>
              <a href="#">
                <FaXTwitter /> @ledo_123{" "}
              </a>
              <a href="#">
                {" "}
                <FaLinkedin />
                Evgen Ledo
              </a>
            </div>
          </div>
          <div className={classes.bottom_right}>
            <div className={classes.bottom_right_appbar}>
              <div className={classes.carousal_controller}>
                <div className={classes.current_carousal_item}>
                  Post
                  <span>
                    <b>12</b>
                  </span>
                </div>
                <div>
                  Photos
                  <span>
                    <b>31</b>
                  </span>
                </div>
              </div>
              {/* <div className={classes.button_group}>
                <button><SlUserFollow/> Follow</button>
                <button><TiMessage/>Message</button>
              </div> */}
            </div>
            <div className={classes.data_grid}>
              {posts.map((post) => {
                return (
                  <div className={classes.grid_item} key={post.postId}>
                    <img
                      src={post.image}
                      alt={`${post.userId}-${post.postId}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Profile;
