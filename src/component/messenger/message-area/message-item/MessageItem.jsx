import classes from "./MessageItem.module.scss";
import { useMemo } from "react";
import { format } from "date-fns";
const MessageItem=({message,currentUser})=>{

const isSent=currentUser?._id===message?.Sender;

const formattedDate = useMemo(() => {
    if (message?.createdAt) {
      const date = new Date(message?.createdAt);
      return `${format(date, "hh:mm")} ${format(date, "a")}`;
    }
    return "";
  }, [message]);

return(
    <div className={classes.message_item} style={{marginLeft: isSent ? "auto":""}}>
     <div>{message?.Message}</div>
     <div>{formattedDate}</div>
    </div>
)
}
export default MessageItem; 
