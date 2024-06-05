import classes from "./AddComment.module.scss";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import USER_FALLBACK from "../../../assets/images/dummy_user.png";
import { BsEmojiSmile } from "react-icons/bs";
import { IoCloseCircleSharp } from "react-icons/io5";
import { addComment as addCommentApi } from "../../../api/comment";
import { toast } from "react-toastify";
import CircularLoader from "../../loaders/circular-loader/CircularLoader";
import EmojiPicker from "emoji-picker-react";
import { useGeneralContext } from "../../../context/GeneralContext";
const AddComment = ({ currentUser, postId, isReply,commentId,afterResponse,expandComments }) => {
  const [comment, setComment] = useState("");
  const[showEmojiPicker,setShowEmojiPicker]=useState(false);
  const{theme}=useGeneralContext();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(addCommentApi, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries("getAllComments");
      setComment("");
      if(afterResponse)
      afterResponse();
      if(expandComments){
        expandComments();
      }
    },
    onError: (error) => {
      toast("Error adding comment!", {
        position: "top-center",
        theme: "dark",
        type: "error",
        autoClose: 2000,
      });
      if(afterResponse)
      afterResponse();
    },
  });

  const handleComment = (e) => {
    e.preventDefault();
    if(isReply){
     mutate({ postId,commentId, message: comment });
     return;
    }
    mutate({ postId, message: comment });
    setComment("");
    setShowEmojiPicker(false);
  };
  return (
    <div className={classes.add_comment}>
       {showEmojiPicker && <div className={classes.emoji_picker_container}>
         <EmojiPicker open={showEmojiPicker} searchDisabled theme={theme}  width="100%" height="100%" onEmojiClick={(e)=>setComment((com)=>com+e.emoji)}/>
        </div>}
       <div className={classes.group}>
       {!isReply && <div className={classes.image_container}>
        <img src={currentUser?.Avatar || USER_FALLBACK} alt="current_user" />
      </div>}
      <form
        className={classes.input_controller}
        onSubmit={(e) => handleComment(e)}
      >
        <input
          placeholder={isLoading ? "Adding a comment":"Add Comment"}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isLoading}
          autoFocus={isReply}
        />
       {isLoading && <CircularLoader/>}
        {!showEmojiPicker && <BsEmojiSmile onClick={()=>setShowEmojiPicker(true)} />}
        {showEmojiPicker && <IoCloseCircleSharp onClick={()=>setShowEmojiPicker(false)}/>}
      </form>
       </div>
    </div>
  );
};
export default AddComment;
