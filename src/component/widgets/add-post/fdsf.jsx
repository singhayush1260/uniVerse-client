import { useState } from 'react';
import classes from './AddPost.module.scss';
import { FaLocationDot } from "react-icons/fa6";
import { FcCompactCamera, FcPicture, FcVideoCall } from "react-icons/fc";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import CloudinaryUploadWidget from '../CloudinaryUploadWidget';
import {useMutation} from "react-query";
import { createPost } from '../../../api/post';
const AddPost=()=>{
  //dhzpiglyn
  //j4yolevb

    const[image, setImage]=useState(null);
    const[imageUrl, setImageUrl]=useState("");
    const[caption, setCaption]=useState("");
    const [publicId, setPublicId] = useState("");
  // Replace with your own cloud name
  const [cloudName] = useState("dhzpiglyn");
  // Replace with your own upload preset
  const [uploadPreset] = useState("j4yolevb");
    

    const containsImage=Boolean(image);
    const containsCaption=caption.length>0;

    const [uwConfig] = useState({
      cloudName,
      uploadPreset
      // cropping: true, //add a cropping step
      // showAdvancedOptions: true,  //add advanced options (public_id and tag)
      // sources: [ "local", "url"], // restrict the upload sources to URL and local files
      // multiple: false,  //restrict upload to a single file
      // folder: "user_images", //upload files to the specified folder
      // tags: ["users", "profile"], //add the given tags to the uploaded files
      // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
      // clientAllowedFormats: ["images"], //restrict uploading to image files only
      // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
      // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
      // theme: "purple", //change to a purple theme
    });
    
    const cld = new Cloudinary({
      cloud: {
        cloudName
      }
    });
  
    const myImage = cld.image(publicId);

    console.log("image url",myImage?.publicId)

    const handleChange=(e)=>{
        setCaption(e.target.value);
        console.log(caption)
    }

   // console.log("imaaaageeee url",imageUrl)

    const{mutate,isLoading,isError,error}=useMutation(createPost,{
      onSuccess:(user)=>{
        console.log("siccess",user)
        dispatch({type:"setUser",payload:user})
        navigate("/")
      },
      onError:()=>{
  
      }
    });

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
         {/* <div><FcCompactCamera/> <span>Camera</span> </div> */}
         {/* <div><FcPicture/> <span>Media</span></div> */}
         <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} setImageUrl={setImageUrl} />
         {/* <div><FcVideoCall/> <span>Video</span> </div> */}
        { (containsCaption || containsImage) && <button>Post</button>}
        </div>
        <AdvancedImage
          style={{ maxWidth: "100%" }}
          cldImg={myImage}
          plugins={[responsive(), placeholder()]}
        />
      </div>
    </div>
}
export default AddPost;