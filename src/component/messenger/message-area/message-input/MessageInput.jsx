import classes from "./MessageInput.module.scss";
import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
const MessageInput=({setMessages})=>{

const[message,setMessage]=useState("");

const sendMessage=(e)=>{
e.preventDefault();
if(message.length>0){
setMessages((messages)=>[...messages,{_id:12,body:message,isSent:true}]);
setMessage("");
}
}

return(
    <form className={classes.message_input} onSubmit={(e)=>sendMessage(e)}>
        <input type="text" placeholder="Enter message" value={message} onChange={(e)=>setMessage(e.target.value)} />
        <BsEmojiSmile />
        <button>Send</button>
      </form>
)
}
export default MessageInput;