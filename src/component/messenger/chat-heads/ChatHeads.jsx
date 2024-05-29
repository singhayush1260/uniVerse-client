import LazyImage from "../../lazy-image/LazyImage";
import classes from "./ChatHeads.module.scss";


const ChatHeads=({chatHeads,setCurrentChat})=>{

return(
    <div className={classes.chat_heads_list}>
      {chatHeads?.length===0 && <div className={classes.no_convo}>
        <IoIosChatboxes/>
        <span>No conversation present.</span>
        </div>}

     {chatHeads.map((chatHead)=>{
        return(
            <div className={classes.chat_head} onClick={()=>setCurrentChat(chatHead)}>
              <div className={classes.image_container}>
                <LazyImage src={chatHead?.Avatar}/>
              </div>
              <div className={classes.detail}>
               <div>
                <p>{chatHead?.Name}</p>
                <p>12:23 AM</p>
               </div>
               <div>
                how are you?
               </div>
              </div>
            </div>
        )
     })}
    </div>
)
}
export default ChatHeads;