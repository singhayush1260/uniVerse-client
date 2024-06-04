import classes from "./ProfileSkeleton.module.scss";
import Appbar from "../../component/appbar/Appbar";

const ProfileSkeleton = () => {
  return (
    <>
      <Appbar />
      <main className={classes.page_wrapper}>
        <div className={classes.top}>
          <div className={classes.cover_picture}>
            <div className={classes.profile_picture}>
            </div>
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.bottom_left}>
            <h2></h2>
            <span></span>
            <p></p>
            <p></p>
            <p></p>
           <button disabled>Add Friend</button>
           <button disabled>Message</button>  
          </div>
          <div className={classes.bottom_right}>
          {<>
          <div className={classes.bottom_right_appbar}>
              <div className={classes.carousal_controller}>
                <div>
                  Post
                </div>
                <div>
                  Videos
                </div>
              </div>
            </div>
            <div className={classes.data_grid}>
              {Array.from({length:4})?.map((post) => {
                //console.log("post",post)
                return <div className={classes.post_wrapper}>
                <div className={classes.post_header}>
                  <div className={classes.user_detail}>
                    <div className={classes.group}>
                      <a></a>
                      <span/>
                    </div>
                  </div>
                </div>
              <div className={classes.post_image}></div>
              </div>
              })}
            </div>
          </>}
          </div>
        </div>
      </main>
    </>
  );
};
export default ProfileSkeleton;
