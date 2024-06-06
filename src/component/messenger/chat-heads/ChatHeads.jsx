import classes from "./ChatHeads.module.scss";
import { useState, useMemo } from "react";
import LazyImage from "../../lazy-image/LazyImage";
import USER_FALLBACK from "../../../assets/images/dummy_user.png";
import { format } from "date-fns";
import Modal from "../../modal/Modal";
import CreateGroup from "../create-group/CreateGroup";
import { MdOutlineGroupAdd } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
const ChatHeads = ({ chatHeads, currentChat, setCurrentChat, isLoading, closeSidebar }) => {

const[showModal,setShowModal]=useState(false);



  const ChatHeadItem = ({ chatHead }) => {
   console.log("chatHead?.LastUpdation",chatHead?.LastUpdation)
    const lastMessage=chatHead?.LastUpdation?.Message?.Attachments?.length>0 ? "Sent an image" : chatHead?.LastUpdation?.Message?.Message;
    const formattedDate = useMemo(() => {
      if (chatHead?.LastUpdation?.Message?.createdAt) {
        const date = new Date(chatHead?.LastUpdation?.Message?.createdAt);
        return `${format(date, "hh:mm")} ${format(date, "a")}`;
      }
      return "";
    }, [chatHead?.LastUpdation?.Message?.createdAt]);
    return (
      <div
        className={`${classes.chat_head} ${
          currentChat?._id === chatHead?._id && classes.current_chat
        }`}
        onClick={() =>{setCurrentChat(chatHead); closeSidebar()}}
      >
        <div className={classes.image_container}>
          <LazyImage src={chatHead?.Members[0]?.Avatar || USER_FALLBACK} />
        </div>
        <div className={classes.detail}>
          <div>
            <p>{chatHead?.Members[0]?.Name}</p>
            <p>{formattedDate}</p>
          </div>
          <div style={{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"}}>{lastMessage}</div>
        </div>
      </div>
    ); 
  };

  return (
    <>
    <div className={classes.chat_heads_list}>
      {/* <div className={classes.create_group_button} onClick={()=>setShowModal(true)}>
        <MdOutlineGroupAdd/>
      </div> */}
      {!isLoading && chatHeads?.length===0 && <div className={classes.no_chat_present}>
        <FaUserFriends/>
        Talk to your friends now
        </div>}
      {isLoading &&
        Array.from({ length: 4 }).map((i) => {
          return (
            <div className={classes.user_skeleton} key={i}>
              <div className={classes.img}></div>
              <div className={classes.detail}>
                <div></div>
                <div></div>
              </div>
            </div>
          );
        })}
      {!isLoading &&
        chatHeads?.length > 0 &&
        chatHeads?.map((chatHead) => {
          return <ChatHeadItem key={chatHead?._id} chatHead={chatHead} />;
        })}
    </div>
   {showModal && <Modal isOpened={showModal} onClose={()=>setShowModal(false)}><CreateGroup/> </Modal>}
    </>
  );
};
export default ChatHeads;
