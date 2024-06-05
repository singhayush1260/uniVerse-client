import classes from "./MessageItem.module.scss";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import Modal from "../../../modal/Modal";
import LazyImage from "../../../lazy-image/LazyImage";
const MessageItem = ({ message, currentUser }) => {
  const [expandedImage, setExpandedImage] = useState(null);

  const isSent = currentUser?._id === message?.Sender;

  const formattedDate = useMemo(() => {
    if (message?.createdAt) {
      const date = new Date(message?.createdAt);
      return `${format(date, "hh:mm")} ${format(date, "a")}`;
    }
    return "";
  }, [message]);

  return (
    <>
      <div
        className={classes.message_item}
        style={{ marginLeft: isSent ? "auto" : "" }}
      >
        {message?.Attachments?.length > 0 &&
          message?.Attachments?.map((url) => {
            return (
              <div
                key={url}
                className={classes.image_container}
                onClick={() => setExpandedImage(url)}
              >
                <img src={url} />
              </div>
            );
          })}
        <p>{message?.Message}</p>
        <div className={classes.time}>{formattedDate}</div>
        <Modal isOpened={!!expandedImage} onClose={() => setExpandedImage(null)}>
       <div className={classes.expanded_image}>
       <LazyImage src={expandedImage} />
       </div>
      </Modal>
      </div>
     
    </>
  );
};
export default MessageItem;
