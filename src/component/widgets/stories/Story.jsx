import classes from "./Stories.module.scss";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import ViewStory from "./ViewStory";
import LazyImage from "../../lazy-image/LazyImage";

const Story = ({ currentUser, name, userId, profile_picture, img }) => {

    const[viewStory, setViewStory]=useState(false);

  return (
   <>
    <div className={classes.story_container} key={userId} onClick={()=>setViewStory(true)}>
      <div className={`${classes.lazy_image_container} ${currentUser === userId ? classes.your_story : "" }`}>
      <LazyImage src={profile_picture} />
      {currentUser === userId && <IoMdAdd />}
      </div>
      <span>{currentUser === userId ? "Your Story" : name.split(" ")[0]}</span>
    </div>
    {  viewStory && <ViewStory viewStory={viewStory} closeViewStory={setViewStory}/>}
   </>
  );
};
export default Story;
