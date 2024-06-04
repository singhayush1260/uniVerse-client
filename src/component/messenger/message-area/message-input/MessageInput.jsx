import classes from "./MessageInput.module.scss";
import { useState } from "react";
import { useSocketContext } from "../../../../context/SocketContext";
import { BsEmojiSmile, BsImage, BsCameraFill } from "react-icons/bs";
import { IoCloseCircleSharp } from "react-icons/io5";
import { CgAttachment } from "react-icons/cg";
import EmojiPicker from "emoji-picker-react";
import { useGeneralContext } from "../../../../context/GeneralContext";
import { motion } from "framer-motion"

const MessageInput = ({ currentUser, currentChat }) => {
  const [message, setMessage] = useState("");
  const[showAttachmentUploader,setShowAttachmentUploader]=useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { socket } = useSocketContext();
  const{setIceBreaker}=useGeneralContext();

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
    <form className={classes.message_input} onSubmit={(e) => sendMessage(e)}>
    { showEmojiPicker && <div className={classes.emoji_picker}>
        <EmojiPicker open={showEmojiPicker} width="100%" height="100%" theme="dark" searchDisabled onEmojiClick={(e)=>setMessage((prevMessage)=>prevMessage+e.emoji)}/>
      </div>}
      {showEmojiPicker && <IoCloseCircleSharp onClick={()=>setShowEmojiPicker(false)} />}
    { !showEmojiPicker && <BsEmojiSmile onClick={()=>setShowEmojiPicker(true)} />}
   
      <div className={classes.attachment_container}>
      {showAttachmentUploader && <IoCloseCircleSharp onClick={()=>setShowAttachmentUploader(false)} />}
      {!showAttachmentUploader && <CgAttachment onClick={()=>setShowAttachmentUploader(!showAttachmentUploader)}/>}
      {showAttachmentUploader && <motion.div initial={{ y: "20px" }}
    animate={{ y: "-5px" }}
    exit={{ y: "40px" }}
    transition={{ duration: 0.5 }} className={classes.attachment_picker}>
       <span>Camera <BsCameraFill/></span>
       <span>Photos <BsImage/></span>
      </motion.div>}
      </div>
      <input
        type="text"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button>Send</button>
    </form>
  );
};
export default MessageInput;
