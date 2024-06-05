import classes from "./ScrollArea.module.scss";
import { useState, useEffect, useRef } from "react";
import MessageItem from "../message-item/MessageItem";
import { useSocketContext } from "../../../../context/SocketContext";
import { TiMessages } from "react-icons/ti";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useGeneralContext } from "../../../../context/GeneralContext";

const ScrollArea = ({ currentUser, currentChat }) => {
  const { socket } = useSocketContext();
  const{iceBreaker,setIceBreaker}=useGeneralContext();
  const latestMessageRef = useRef(null);
  const [messages, setMessages] = useState([]);


  const scrollToBottom = () => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!socket) return;

    const fetchMessages = () => {
      socket.emit("get-chat-messages", {
        userID: currentUser?._id,
        groupID: currentChat?._id,
      });
    };

    const handleChatMessagesFetched = (data) => {
      setMessages(data?.messages);
      scrollToBottom();
    };

    const handleMessageReceived = (data) => {
      console.log("received message",data)
      const isMessageExists = messages.some(
        (message) => message._id === data?.messageDoc?._id
      );

      if (!isMessageExists) {
        setMessages((prevMessages) => [...prevMessages, data?.messageDoc]);
        scrollToBottom();
      }
    };

    fetchMessages();
    socket.on("chat-messages-fetched", handleChatMessagesFetched);
    socket.on("message-received", handleMessageReceived);

    return () => {
      socket.off("chat-messages-fetched", handleChatMessagesFetched);
      socket.off("message-received", handleMessageReceived);
    };
  }, [currentChat]);

  return (
    <div className={classes.scroll_area}>
   
      {messages.length === 0 && (
        <div className={classes.no_message}>
          <TiMessages />
          <p>No message found.</p>
          <p>Start a conversation now.</p>
        </div>
      )}
      {messages.length > 0 &&
        messages
          ?.sort((m1, m2) => new Date(m1?.createdAt) - new Date(m2?.createdAt))
          ?.map((message) => {
            return (
              <MessageItem
                message={message}
                key={message._id}
                currentUser={currentUser}
              />
            );
          })}
      <div ref={latestMessageRef} className={classes.last_message}>
     {iceBreaker.length>0 && <div className={classes.ice_breaker}>
      <span> <h5>Stuck! Try our AI generated Ice Breakers</h5> <IoCloseCircleSharp onClick={()=>setIceBreaker([])}/></span>
      {
      iceBreaker?.map((ib)=><div key={ib} title="Copy Text" onClick={() => {navigator.clipboard.writeText(ib)}}>{ib}</div>)
     }</div>}
      </div>
    </div>
  );
};

export default ScrollArea;
