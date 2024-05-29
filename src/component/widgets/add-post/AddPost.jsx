import classes from "./AddPost.module.scss";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { FcCompactCamera, FcPicture, FcVideoCall } from "react-icons/fc";
import {
  createPost as createPostApi,
  uploadToCloudinary as uploadToCloudinaryApi,
} from "../../../api/post";
import CircularLoader from "../../../component/loaders/circular-loader/CircularLoader";
import Modal from "../../modal/Modal";
import WebcamCapture from "../webcam-capture/WebcamCapture";
import LazyImage from "../../lazy-image/LazyImage";
import USER_FALLBACK from "../../../assets/images/dummy_user.png";

const AddPost = ({currentUser}) => {
  const queryClient = useQueryClient();
  const [images, setImages] = useState([]);
  const [capturedImage, setCapturedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [showWebcam, setShowWebcam] = useState(false);
  const containsImage = images?.length > 0;
  const containsCaption = caption?.length > 0;

  const addImages = (e) => {
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
  };
  const removeSelection = (item) => {
    setImages((images) => images.filter((image) => image !== item));
  };
  const {
    mutate: createPost,
    isLoading,
  } = useMutation(createPostApi, {
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
  const {
    mutate: uploadToCloudinary,
    cloudinaryIsLoading,
  } = useMutation(uploadToCloudinaryApi, {
    onSuccess: (data) => {
      createPost({ attachments: [data.url], caption });
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
    const formData = new FormData();
    if (images?.length > 0) {
      formData.append("file", images[0]);
      formData.append("upload_preset", "j4yolevb");
      formData.append("cloud_name", "dhzpiglyn");
      uploadToCloudinary(formData);
    }
    if (capturedImage) {
      formData.append("file", capturedImage);
      formData.append("upload_preset", "j4yolevb");
      formData.append("cloud_name", "dhzpiglyn");
      uploadToCloudinary(formData);
    }
  };
  return (
    <div className={classes.widget_wrapper}>
      <div className={classes.left_container}>
        <div className={classes.image_container}>
          {/* <img
            src="https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532"
            alt="user"
          /> */}
          <LazyImage src={currentUser?.Avatar || USER_FALLBACK}/>
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
          <label>
            <FcVideoCall /> <span>Video</span>{" "}
          </label>
          {(containsCaption || containsImage || capturedImage) && (
            <button
              disabled={isLoading || cloudinaryIsLoading}
              onClick={() => createPostButtonClick()}
            >
              {isLoading || cloudinaryIsLoading ? <CircularLoader /> : "Post"}
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
              setShowWebcam={setShowWebcam}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};
export default AddPost;
