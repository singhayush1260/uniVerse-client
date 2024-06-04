import classes from "./MessageInput.module.scss";
import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useSocketContext } from "../../../../context/SocketContext";
import { BsEmojiSmile, BsImage, BsCameraFill } from "react-icons/bs";
import { IoCloseCircleSharp } from "react-icons/io5";
import { CgAttachment } from "react-icons/cg";
import EmojiPicker from "emoji-picker-react";
import { useGeneralContext } from "../../../../context/GeneralContext";
import { motion } from "framer-motion";
import WebcamCapture from "../../../widgets/webcam-capture/WebcamCapture";
import Modal from "../../../modal/Modal";
import useCloudinary from "../../../../hooks/useCloudinary";
import LazyImage from "../../../lazy-image/LazyImage";
import { IoCloseCircle } from "react-icons/io5";

const MessageInput = ({ currentUser, currentChat }) => {
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [showAttachmentUploader, setShowAttachmentUploader] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { socket } = useSocketContext();
  const { setIceBreaker,theme } = useGeneralContext();
  const containsImage = images?.length > 0;

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
      console.log("error uploading to cloudinary", error);
    },
  });

  const addImages = useCallback(
    (e) => {
      const selectedFiles = Array.from(e.target.files);
      const totalFiles = images?.length + selectedFiles.length;
       
      if (totalFiles >4) {
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

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      socket?.emit("send-message", {
        message,
        userID: currentUser?._id,
        groupID: currentChat?._id,
      });
      setMessage("");
      setIceBreaker([]);
    }
    setShowEmojiPicker(false);
  };

  return (
    <>
      <form className={classes.message_input} onSubmit={(e) => sendMessage(e)}>
        {(containsImage || capturedImage) && <div className={classes.media_preview}>
        {images.map((image) => {
                return (
                  <div className={classes.image_container}>
                    <LazyImage src={URL.createObjectURL(image)} alt="image" />
                    <IoCloseCircle onClick={() => removeSelection(image)} />
                  </div>
                );
              })}
              {capturedImage && (
                <div className={classes.image_container}>
                  <LazyImage src={capturedImage} alt="image" />
                  <IoCloseCircle onClick={() => setCapturedImage(null)} />
                </div>
              )}
        </div>}
        {showEmojiPicker && (
          <div className={classes.emoji_picker}>
            <EmojiPicker
              open={showEmojiPicker}
              width="100%"
              height="100%"
              theme={theme}
              searchDisabled
              onEmojiClick={(e) =>
                setMessage((prevMessage) => prevMessage + e.emoji)
              }
            />
          </div>
        )}
        {showEmojiPicker && (
          <IoCloseCircleSharp onClick={() => setShowEmojiPicker(false)} />
        )}
        {!showEmojiPicker && (
          <BsEmojiSmile onClick={() => setShowEmojiPicker(true)} />
        )}

        <div className={classes.attachment_container}>
          {showAttachmentUploader && (
            <IoCloseCircleSharp
              onClick={() => setShowAttachmentUploader(false)}
            />
          )}
          {!showAttachmentUploader && (
            <CgAttachment
              onClick={() => setShowAttachmentUploader(!showAttachmentUploader)}
            />
          )}
          {showAttachmentUploader && (
            <motion.div
              initial={{ y: "20px" }}
              animate={{ y: "-5px" }}
              exit={{ y: "40px" }}
              transition={{ duration: 0.5 }}
              className={classes.attachment_picker}
            >
              <label onClick={() => setShowWebcam(true)}>
                Camera <BsCameraFill />
              </label>
              <label htmlFor="image picker">
                Photos <BsImage />
              </label>
              <input
                type="file"
                id="image picker"
                multiple
                onChange={(e) => addImages(e)}
                style={{ display: "none" }}
              />
            </motion.div>
          )}
        </div>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
      </form>
      {showWebcam && (
        <Modal isOpened={showWebcam}>
          <WebcamCapture
            setCapturedImage={setCapturedImage}
            setShowWebcam={setShowWebcam}
          />
        </Modal>
      )}
    </>
  );
};
export default MessageInput;
