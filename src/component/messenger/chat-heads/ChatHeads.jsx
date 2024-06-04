import classes from "./ChatHeads.module.scss";
import { useMemo } from "react";
import LazyImage from "../../lazy-image/LazyImage";
import USER_FALLBACK from "../../../assets/images/dummy_user.png";
import { format } from "date-fns";
const ChatHeads = ({ chatHeads, currentChat, setCurrentChat, isLoading }) => {
  const ChatHeadItem = ({ chatHead }) => {
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
        onClick={() => setCurrentChat(chatHead)}
      >
        <div className={classes.image_container}>
          <LazyImage src={chatHead?.Members[0]?.Avatar || USER_FALLBACK} />
        </div>
        <div className={classes.detail}>
          <div>
            <p>{chatHead?.Members[0]?.Name}</p>
            <p>{formattedDate}</p>
          </div>
          <div>{chatHead?.LastUpdation?.Message.Message}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.chat_heads_list}>
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
  );
};
export default ChatHeads;
