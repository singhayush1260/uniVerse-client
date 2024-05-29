import classes from "./Reaction.module.scss";
import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import EmojiPicker from "emoji-picker-react";
import { reactOn as reactOnApi } from "../../../api/react";

const Reaction = ({ parentId, reactionsDefaultOpen, onClose,setReaction }) => {
  const [isOpen, setIsOpen] = useState(reactionsDefaultOpen);
  const emojiPickerRef = useRef();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(reactOnApi, {
    onSuccess: (data) => {
      console.log("react success", data);
      queryClient.invalidateQueries("getPostReaction");
    },
    onError: (error) => {
      toast("Something went wrong.", {
        position: "top-center",
        theme: "dark",
        type: "error",
        autoClose: 3000,
      });
    },
  });

  const reactOn=(e)=>{
   mutate({like:true,reaction:e?.emoji,model:"Post",parentId})
   setReaction(e?.emoji);
   setIsOpen(false);
   onClose();
  }
  

  useEffect(() => {
    const clickOutside = (e) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        onClose();
      }
    };
    document.addEventListener("click", clickOutside, true);
    return () => document.removeEventListener("click", clickOutside, true);
  }, []);

  return (
    <div className={classes.emoji_picker} ref={emojiPickerRef}>
      <EmojiPicker
        reactionsDefaultOpen={isOpen}
        theme="dark"
        onEmojiClick={(e) =>reactOn(e) }
      />
    </div>
  );
};
export default Reaction;
