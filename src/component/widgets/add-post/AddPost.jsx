import { useState } from 'react';
import classes from './AddPost.module.scss';
import { FaLocationDot } from "react-icons/fa6";
import { FcCompactCamera, FcPicture, FcVideoCall } from "react-icons/fc";
const AddPost=()=>{

    const[image, setImage]=useState(null);
    const[caption, setCaption]=useState("");
    const containsImage=Boolean(image);
    const containsCaption=caption.length>0;

    const handleChange=(e)=>{
        setCaption(e.target.value);
        console.log(caption)
    }

    return <div className={classes.widget_wrapper}>
      <div className={classes.left_container}>
      <div>
      <img src="https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532" alt="user" />
      </div>
      </div>
      <div className={classes.right_container}>
        <textarea cols="30" rows="1" placeholder="What's on your mind!" onChange={(e)=>handleChange(e)}/>
     {  containsImage && <div className={classes.image_container}>
      <img src="https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532" alt="user" />
      </div>}
      <div className={classes.icons}>
         <div><FcCompactCamera/> <span>Camera</span> </div>
         <div><FcPicture/> <span>Image</span></div>
         <div><FcVideoCall/> <span>Video</span> </div>
        { (containsCaption || containsImage) && <button>Post</button>}
        </div>
      </div>
    </div>
}
export default AddPost;