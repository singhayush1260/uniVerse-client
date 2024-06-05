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
  const [selectedImages, setSelectedImages] = useState([]);
  const [showAttachmentUploader, setShowAttachmentUploader] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { socket } = useSocketContext();
  const { setIceBreaker, theme } = useGeneralContext();
  const containsImage = selectedImages?.length > 0;

  const {
    upload,
    isLoading: uploadingToCloudinary,
    error,
  } = useCloudinary({
    onSuccess: (data) => {
      const imageUrls = data?.map((datum) => datum.url);
      setSelectedImages([]);
      setCapturedImage(null);
      sendMessage(imageUrls);
    },
    onError: (error) => {},
  });

  const addSelectedImages = useCallback(
    (e) => {
      setCapturedImage(null);
      const selectedFiles = Array.from(e.target.files);
      const totalFiles = selectedImages?.length + selectedFiles.length;

      if (totalFiles > 5) {
        const remainingSlots = 5 - selectedImages?.length;
        const filesToAdd = selectedFiles.slice(0, remainingSlots);
        setSelectedImages((prevselectedImages) => {
          return [...prevselectedImages, ...filesToAdd];
        });
        toast("You can only upload up to 5 selectedImages.", {
          position: "top-center",
          theme: "dark",
          type: "error",
          autoClose: 3000,
        });
      } else {
        setSelectedImages((prevSelectedImages) => {
          return [...prevSelectedImages, ...selectedFiles];
        });
        setShowAttachmentUploader(false);
      }
    },
    [selectedImages, setSelectedImages, toast]
  );
  const removeSelection = useCallback((item) => {
    setSelectedImages((images) => images.filter((image) => image !== item));
  });

  const createMessage = (e) => {
    e.preventDefault();
    if (capturedImage) {
      upload([capturedImage]);
    } else if (selectedImages.length > 0) {
      upload(selectedImages);
    } else {
      sendMessage(undefined);
    }
  };

  const sendMessage = (attachments) => {
    if (message.length > 0 || attachments) {
      socket?.emit("send-message", {
        message: attachments ? undefined : message,
        userID: currentUser?._id,
        attachments,
        groupID: currentChat?._id,
      });
      setMessage("");
      setIceBreaker([]);
      socket?.emit("get-chat-heads", { userID: currentUser?._id });
    }
    setShowEmojiPicker(false);
  };

  return (
    <>
      <form
        className={classes.message_input}
        onSubmit={(e) => createMessage(e)}
      >
        {(containsImage || capturedImage) && (
          <div className={classes.media_preview}>
            {selectedImages &&
              selectedImages?.map((image) => {
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
          </div>
        )}
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
          <IoCloseCircleSharp
            onClick={() => {
              setShowEmojiPicker(false);
            }}
          />
        )}
        {!showEmojiPicker && (
          <BsEmojiSmile
            onClick={() => {
              setShowAttachmentUploader(false);
              setShowEmojiPicker(true);
            }}
          />
        )}

        <div className={classes.attachment_container}>
          {showAttachmentUploader && (
            <IoCloseCircleSharp
              onClick={() => setShowAttachmentUploader(false)}
            />
          )}
          {!showAttachmentUploader && (
            <CgAttachment
              onClick={() => {
                setShowEmojiPicker(false);
                setShowAttachmentUploader(!showAttachmentUploader);
              }}
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
              <label
                onClick={() => {
                  setSelectedImages([]);
                  setShowWebcam(true);
                }}
              >
                Camera <BsCameraFill />
              </label>
              <label htmlFor="image picker">
                Photos <BsImage />
              </label>
              <input
                type="file"
                id="image picker"
                multiple
                onChange={(e) => addSelectedImages(e)}
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
            closeMenu={() => setShowAttachmentUploader(false)}
            onCapture={(result) => {
              setCapturedImage(result);
              setShowWebcam(false);
            }}
          />
        </Modal>
      )}
    </>
  );
};
export default MessageInput;
