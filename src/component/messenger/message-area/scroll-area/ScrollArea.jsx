import MessageItem from "../message-item/MessageItem";
import classes from "./ScrollArea.module.scss";
import { useState,useEffect,useRef } from "react";

const ScrollArea=({messages,chatId})=>{
    const latestMessageRef = useRef(null);

    const scrollToBottom = () => {
      if (latestMessageRef.current) {
        latestMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
return(
    <div className={classes.scroll_area}>
      {messages.map((message)=>{
        return <MessageItem message={message} key={message._id}/>
      })}
      <div ref={latestMessageRef}/>
    </div>
)
}
export default ScrollArea;