import classes from "./Stories.module.scss";
import Story from "./Story";
import { useSelector } from "react-redux";
const Stories = () => {

  const {userData:{userId :currentUser}}=useSelector((state)=>state.userReducer);

  const {stories}=useSelector((state)=>state.storyReducer);

  return (
    <div className={classes.widget_wrapper}>
    {stories.map((story) => {
     return <Story
        key={story.userId}
        currentUser={currentUser}
        name={story.name}
        userId={story.userId}
        profile_picture={story.profile_picture}
      />;
    })}
  </div>
  );
};
export default Stories;

