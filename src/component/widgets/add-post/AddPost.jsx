import classes from "./AddPost.module.scss";
import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { FcCompactCamera, FcPicture, FcVideoCall } from "react-icons/fc";
import { createPost as createPostApi } from "../../../api/post";
import CircularLoader from "../../../component/loaders/circular-loader/CircularLoader";
import Modal from "../../modal/Modal";
import WebcamCapture from "../webcam-capture/WebcamCapture";
import LazyImage from "../../lazy-image/LazyImage";
import USER_FALLBACK from "../../../assets/images/dummy_user.png";
import useCloudinary from "../../../hooks/useCloudinary";
import ImageUploader from "../image-uploader/ImageUploader";

const AddPost = ({ currentUser }) => {
  const queryClient = useQueryClient();
  const [images, setImages] = useState([]);
  const [capturedImage, setCapturedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [showWebcam, setShowWebcam] = useState(false);
  const containsImage = images?.length > 0;
  const containsCaption = caption?.length > 0;

  const addImages = useCallback(
    (e) => {
      setCapturedImage(null)
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
    },
    [images, setImages, toast]
  );

  const removeSelection = useCallback((item) => {
    setImages((images) => images.filter((image) => image !== item));
  });

  const {
    upload,
    isLoading: uploadingToCloudinary,
    error,
  } = useCloudinary({
    onSuccess: (data) => {
      console.log("Upload successful!", data);
      const imageUrls = data?.map((datum) => datum.url);
      console.log("images urls", imageUrls);
      createPost({ attachments: imageUrls, caption });
    },
    onError: (error) => {
      console.log("error uplodmin to cloudiaf",error)
      toast("Error creating post.", {
        position: "top-center",
        theme: "dark",
        type: "error",
        autoClose: 3000,
      });
    },
  });

  const { mutate: createPost, isLoading } = useMutation(createPostApi, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getAllPosts");
      setImages([]);
      setCaption("");
      setCapturedImage(null);
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

  const createPostButtonClick = () => {
    if (images?.length > 0) {
      upload(images);
    }
    else if (capturedImage) {
      upload([capturedImage]);
    }
    else{
     if(caption.length>0){
      console.log("just caption")
      createPost({ caption });
     }
    }
  };
  return (
    <div className={classes.widget_wrapper}>
      <div className={classes.left_container}>
        <div className={classes.image_container}>
          <LazyImage src={currentUser?.Avatar || USER_FALLBACK} />
        </div>
      </div>
      <div className={classes.right_container}>
        <textarea
          cols="30"
          rows="1"
          placeholder="What's on your mind!"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <div className={classes.icons}>
          <label onClick={() => setShowWebcam(!showWebcam)}>
            <FcCompactCamera /> <span>Camera</span>{" "}
          </label>
          <label htmlFor="image">
            <FcPicture /> <span>Image</span>
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => addImages(e)}
            multiple
          />
          {(containsCaption || containsImage || capturedImage) && (
            <button
              disabled={isLoading || uploadingToCloudinary}
              onClick={() => createPostButtonClick()}
            >
              {isLoading || uploadingToCloudinary ? <CircularLoader /> : "Post"}
            </button>
          )}
        </div>
        {(containsImage || capturedImage) && (
          <div className={classes.image_container}>
            {images.map((image) => {
              return (
                <div>
                  <img src={URL.createObjectURL(image)} alt="image" />
                  <span onClick={() => removeSelection(image)}>x</span>
                </div>
              );
            })}
            {capturedImage && (
              <div>
                <img src={capturedImage} alt="image" />
                <span onClick={() => setCapturedImage(null)}>x</span>
              </div>
            )}
          </div>
        )}
        {showWebcam && (
          <Modal isOpened={showWebcam}>
            <WebcamCapture
              setCapturedImage={setCapturedImage}
              onCapture={(result)=>{setImages([]);setCapturedImage(result)}}
              setShowWebcam={setShowWebcam}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};
export default AddPost;
