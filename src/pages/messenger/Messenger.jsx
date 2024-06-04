import classes from "./Messenger.module.scss";
import { useState, useEffect } from "react";
import Appbar from "../../component/appbar/Appbar";
import MobileSidebar from "../../component/mobile-sidebar/MobileSidebar";
import ChatHeads from "../../component/messenger/chat-heads/ChatHeads";
import { AnimatePresence } from "framer-motion";
import ChatHeader from "../../component/messenger/message-area/chat-header/ChatHeader";
import ScrollArea from "../../component/messenger/message-area/scroll-area/ScrollArea";
import MessageInput from "../../component/messenger/message-area/message-input/MessageInput";
import { useSocketContext } from "../../context/SocketContext";
import useUser from "../../hooks/useUser";
import { IoIosChatboxes } from "react-icons/io";
import { useGeneralContext } from "../../context/GeneralContext";
const Messenger = () => {
  const [loadingChatHeads, setLoadingChatHeads] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const { user: currentUser } = useUser();
  const [chatHeads, setChatHeads] = useState([]);
  const { socket } = useSocketContext();
  const{iceBreaker,setIceBreaker}=useGeneralContext();
  useEffect(() => {
    setLoadingChatHeads(true);
    socket?.emit("get-chat-heads", { userID: currentUser?._id });
    socket?.on("chat-heads-fetched", (data) => {
      console.log("chat heads deleted",data);
      const transformedChatHeads = data?.populatedChatHeads?.map((ch) => {
        const newMember = ch?.Members?.filter((m) => {
          return currentUser?._id !== m?._id;
        });
        return { ...ch, Members: newMember };
      });
      setChatHeads(transformedChatHeads);
      setLoadingChatHeads(false);
    });
  }, []);

  useEffect(() => {
    socket?.emit("new-user-connected", {
      userID: currentUser?._id,
      community: currentUser?.Community,
    });
  }, []);
  return (
    <>
      <Appbar />
      <main className={classes.page_wrapper}>
        {
          <>
            <div className={classes.chat_head_container}>
              <ChatHeads
                isLoading={loadingChatHeads}
                chatHeads={chatHeads}
                setCurrentChat={setCurrentChat}
                currentChat={currentChat}
              />
            </div>
            <div className={classes.message_area}>
              <AnimatePresence>
                {showSidebar && (
                  <MobileSidebar onClose={() => setShowSidebar(false)}>
                    <ChatHeads
                      isLoading={loadingChatHeads}
                      chatHeads={chatHeads}
                      setCurrentChat={setCurrentChat}
                      currentChat={currentChat}
                    />
                  </MobileSidebar>
                )}
              </AnimatePresence>
              {!loadingChatHeads && chatHeads?.length === 0 && (
                <div className={classes.no_convo}>
                  <IoIosChatboxes />
                  <span>No conversation present.</span>
                </div>
              )}
              {!currentChat && <div>No chat selected.</div>}
              {currentChat && (
                <>
                  <ChatHeader
                    currentUser={currentUser}
                    currentChat={currentChat}
                    showSidebar={showSidebar}
                    setShowSidebar={() => setShowSidebar(true)}
                  />
                  <ScrollArea
                    currentUser={currentUser}
                    currentChat={currentChat}
                  />
                  <MessageInput
                    currentUser={currentUser}
                    currentChat={currentChat}
                  />
                </>
              )}
            </div>
          </>
        }
      </main>
    </>
  );
};
export default Messenger;
