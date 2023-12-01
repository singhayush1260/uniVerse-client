import Modal from "../../modal/Modal";
import classes from "./ViewStory.module.scss";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
const ViewStory = ({ viewStory = false, closeViewStory }) => {
  const [duration, setDuration] = useState(0);


  useEffect(()=>{
    const interval=setInterval(()=>{
        setDuration((d)=>{
            return (d + 1 > 100) ? (closeViewStory(false), 0) : (d + 1);
        });
    },50)
    return ()=>clearInterval(interval);
  },[])

  return (
    <Modal isOpened={viewStory}>
      <div className={classes.view_story_container}>
        <div className={classes.header}>
          <span>Your Story</span>
          <IoCloseCircleOutline onClick={() => closeViewStory(false)} />
        </div>
        <div className={classes.loader_container}>
          <div className={classes.loader}>
            <div style={{width:duration<101?`${duration}%`:0}}></div>
           </div>
        </div>
        <div className={classes.image_container}>
          <img src="https://img.freepik.com/free-photo/beautiful-tropical-beach-sea-ocean-with-coconut-palm-tree-sunrise-time_74190-7454.jpg?w=740&t=st=1699451376~exp=1699451976~hmac=f5b723fd0acb179d17d79d11c01b598b40e480723c2f760ec0cdd83ef696d2c4" alt="post"/>
        </div>
      </div>
    </Modal>
  );
};
export default ViewStory;
