import classes from "./ImageUploader.module.scss";
import { useState,useCallback } from "react";
import { toast } from "react-toastify";
import useCloudinary from "../../../hooks/useCloudinary";
const ImageUploader=({children,onSuccess,setResponse})=>{
    const [images, setImages] = useState([]);
    const { upload,isLoading:uploadingToCloudinary, error } = useCloudinary({
        onSuccess: (data) => {
          console.log("Upload successful!", data);
          const imageUrls=data?.map((datum)=>datum.url)
          console.log("images urls",imageUrls);
          createPost({ attachments: imageUrls, caption });
        },
        onError: (error) => {
          toast("Error creating post.", {
            position: "top-center",
            theme: "dark",
            type: "error",
            autoClose: 3000,
          });
        },
      });
    const addImages=useCallback((e)=>{
        const selectedFiles = Array.from(e.target.files);
        const totalFiles = images?.length + selectedFiles.length;
    
        if (totalFiles > 5) {
          const remainingSlots = 5 - images?.length;
          const filesToAdd = selectedFiles.slice(0, remainingSlots);
          setImages((prevImages) => [...prevImages, ...filesToAdd]);
          toast("You can only upload up to 5 images.", {
            position: "top-center",
            theme: "dark",
            type: "error",
            autoClose: 3000,
          });
        } else {
          setImages((prevImages) => [...prevImages, ...selectedFiles]);
        }
      },[images,setImages,toast]);
    return(
        <>
        <label htmlFor="image uploader">
        {children}
        </label>
        <input id="image uploader" type="file" onChange={(e) => addImages(e)} multiple style={{display:"none"}}/>
        </>
    )
}
export default ImageUploader;