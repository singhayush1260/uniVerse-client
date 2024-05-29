import classes from "./MessageItem.module.scss";

const MessageItem=({message})=>{
return(
    <div className={classes.message_item} style={{marginLeft: message?.isSent ? "auto":""}}>
     <div>{message?.body}</div>
     <div>2:34 am</div>
    </div>
)
}
export default MessageItem;