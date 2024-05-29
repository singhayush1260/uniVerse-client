import WebcamCapture from "../webcam-capture/WebcamCapture";
import classes from "./UploadPictureCrop.module.scss";
import { useState } from "react";
import Cropper from 'react-easy-crop'
const UploadPictureCrop=()=>{

const[picture,setPicture]=useState(null);
const[showWebcam,setShowWebcam]=useState(false);  
const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }     

return(
    <div className={classes.container}>
      <p>Upload your picture</p>
      <label htmlFor="picture">Upload </label>
      <input type="file" id="picture" onChange={(e)=>setPicture(e.target.files[0])}/>
      <p>Or Capture</p>
      <WebcamCapture setCapturedImage={setPicture} showWebcam={setShowWebcam}/>
      <div className={classes.picture}>
      {/* <Cropper
      image={picture}
      crop={crop}
      zoom={zoom}
      aspect={4 / 3}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    /> */}
      </div>
    </div>
)
}
export default UploadPictureCrop;