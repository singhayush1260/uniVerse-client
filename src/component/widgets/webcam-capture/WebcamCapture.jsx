import classes from "./WebcamCapture.module.scss";
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = ({setCapturedImage,setShowWebcam, closeMenu}) => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    setCapturedImage(imageSrc);
    setShowWebcam(false);
    closeMenu();
  };

  return (
    <div className={classes.webcam_container}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
      <div>
      <button onClick={capture}>Capture</button>
      <button onClick={()=>setShowWebcam(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default WebcamCapture;
