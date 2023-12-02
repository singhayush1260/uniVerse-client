import classes from "./Messenger.module.scss";
import Appbar from "../../component/appbar/Appbar";
import UserList from "./user-list/UserList";
import { useSelector } from "react-redux";
import { useState } from "react";
import ChatPanel from "./chat-panel/ChatPanel";
import { motion } from "framer-motion";
const Messenger = () => {
  const { friends } = useSelector((state) => state.friendsReducer);
  const [currentChat, setCurrentChat] = useState(null);
  const showChatPanel = Boolean(currentChat);

  return (
    <>
      <Appbar />
      <motion.main className={classes.page_wrapper}
      initial={{ x: "-500px" }}
      animate={{ x: "0px" }}
      exit={{ x: 0 }}
      transition={{ duration: 0.5 }}
>
        <div className={classes.messenger_container}>
          <UserList
            friends={friends}
            showChatPanel={showChatPanel}
            setCurrentChat={setCurrentChat}
          />
          {showChatPanel ? (
            <ChatPanel
              friends={friends}
              currentChat={currentChat}
              setCurrentChat={setCurrentChat}
            />
          ) : (
            <span className={classes.no_user_selected}>
              Select user to view chats
            </span>
          )}
        </div>
      </motion.main>
    </>
  );
};
export default Messenger;
