import classes from "./Messenger.module.scss";
import { useState,useEffect } from "react";
import { useQuery } from "react-query";
import Appbar from "../../component/appbar/Appbar";
import MobileSidebar from "../../component/mobile-sidebar/MobileSidebar";
import ChatHeads from "../../component/messenger/chat-heads/ChatHeads";
import { AnimatePresence } from "framer-motion";
import ChatHeader from "../../component/messenger/message-area/chat-header/ChatHeader";
import ScrollArea from "../../component/messenger/message-area/scroll-area/ScrollArea";
import MessageInput from "../../component/messenger/message-area/message-input/MessageInput";
import { getAllChatHeads } from "../../api/chat";
import { useSocketContext } from "../../context/SocketContext";
import useUser from "../../hooks/useUser";
import { IoIosChatboxes } from "react-icons/io";
const Messenger = () => {
  const [currentChat, setCurrentChat] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const{user:currentUser}=useUser();
  const[chatHeads,setChatHeads]=useState([]);
  const{data,isLoading,error}=useQuery("getAllChatHeads",getAllChatHeads);
  //console.log("chat heads from messenger",data);
  const{socket}=useSocketContext();
  const chatHeads1 = [
    {
      Name: "John Snow",
      Username: "erd4",
      Avatar:
        "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
    },
    {
      Name: "John Snow1",
      Username: "era4",
      Avatar:
        "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
    },
    {
      Name: "John Snow2",
      Username: "er1a4",
      Avatar:
        "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
    },
    {
      Name: "John Snow3",
      Username: "ecv4",
      Avatar:
        "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
    },
    {
        Name: "John Snow4",
        Username: "ecv4",
        Avatar:
          "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
      },
      {
        Name: "John Snow5",
        Username: "ecv4",
        Avatar:
          "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
      },
      {
        Name: "John Snow6",
        Username: "ecv4",
        Avatar:
          "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
      },
      {
        Name: "John Snow7",
        Username: "ecv4",
        Avatar:
          "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
      },
      {
        Name: "John Snow8",
        Username: "ecv4",
        Avatar:
          "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
      },
  ];

  const messagesArrays = [
    {
      _id: "1",
      body: "Hello, how are you?",
      by: "Alice",
      isSent:false
    },
    {
      _id: "2",
      body: "I'm fine, thanks! How about you?",
      by: "Bob",
      isSent:true
    },
    {
      _id: "3",
      body: "I'm doing well. What are you up to?",
      by: "Alice",
      isSent:false
    },
    {
      _id: "4",
      body: "Just working on a project. Have you seen the latest news?",
      by: "Bob",
      isSent:true

    },
    {
      _id: "5",
      body: "No, I haven't. What happened?",
      by: "Alice",
      isSent:false
    },
    {
      _id: "6",
      body: "There was a big announcement about the new tech product.",
      by: "Bob",
      isSent:!false
    },
    {
      _id: "7",
      body: "Oh, that's interesting! I'll check it out.",
      by: "Alice",
      isSent:false
    },
    {
      _id: "8",
      body: "Definitely, it's worth a look.",
      by: "Bob",
      isSent:!false
    },
    {
      _id: "9",
      body: "Have you heard about the new restaurant downtown?",
      by: "Alice",
      isSent:false
    },
    {
      _id: "10",
      body: "Yes, I went there last weekend. The food was amazing!",
      by: "Bob",
      isSent:!false
    },
    {
      _id: "11",
      body: "That's great to hear! I might go there this weekend.",
      by: "Alice",
      isSent:false
    },
    {
      _id: "12",
      body: "You should! Let me know if you need any recommendations.",
      by: "Bob",
      isSent:!false
    },
    {
      _id: "13",
      body: "Will do. Thanks, Bob!",
      by: "Alice",
      isSent:false
    },
    {
      _id: "14",
      body: "Anytime, Alice! Have a great day.",
      by: "Bob",
      isSent:!false
    }
  ];

  useEffect(()=>{
    //console.log("messenger uf 1",socket)
    //console.log("current user",currentUser)
    socket?.emit("get-chat-heads",{userID:currentUser?._id})
    socket?.on("chat-heads-fetched",(data)=>{
      console.log("chat heads fetched",data);
      setChatHeads(data?.populatedChatHeads);
    })
  },[])
  
  const[messages,setMessages]=useState(messagesArrays);
  return (
    <>
      <Appbar />
      <main className={classes.page_wrapper}>
        {chatHeads.length===0 && <div className={classes.no_convo}>
        <IoIosChatboxes/>
        <span>No conversation present.</span>
        </div>}
        {chatHeads.length>0 && <>
        <div className={classes.chat_head_container}>
          <ChatHeads chatHeads={chatHeads} setCurrentChat={setCurrentChat}/>
        </div>
        <div className={classes.message_area}>
          <AnimatePresence>
            {showSidebar && (
              <MobileSidebar onClose={() => setShowSidebar(false)}>
                <ChatHeads chatHeads={chatHeads} setCurrentChat={setCurrentChat}/>
              </MobileSidebar>
            )}
          </AnimatePresence>
          {!currentChat && <div>No chat selected.</div>}
         {currentChat && <>
         <ChatHeader
            currentChat={currentChat}
            showSidebar={showSidebar}
            setShowSidebar={() => setShowSidebar(true)}
          />
          <ScrollArea messages={messages}/>
          <MessageInput setMessages={setMessages}/>
         </>}
         
        </div>
        </>}
      </main>
    </>
  );
};
export default Messenger;
