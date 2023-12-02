import classes from './ChatPanel.module.scss';
import LazyImage from '../../../component/lazy-image/LazyImage';
import { FaAngleLeft, FaVideo, FaCamera, FaMicrophone } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiMicrophoneOn } from "react-icons/ci";
import { IoIosAttach, IoMdSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
const ChatPanel=({friends, currentChat, setCurrentChat})=>{
    return <div className={`${classes.chat_panel} `}>
      <div className={classes.topbar}>
      <div className={classes.user}>
          <FaAngleLeft onClick={()=>setCurrentChat(null)}/>
              <div className={classes.user_image}>
               <LazyImage src={friends[0].profile_picture}/>
              </div>
              <div className={classes.user_details}>
                <span><b>{friends[0].name}</b></span>
                <em>{currentChat}</em>
              </div>
            </div>
            <div className={classes.options}>
            <IoCall/>
        <FaVideo/>
        <BsThreeDotsVertical/>
            </div>
      </div>
      <div className={classes.chat_area}>
.
      </div>
      <div className={classes.input_area}>
       <div className={classes.input_controller}>
        <FaMicrophone/>
        <textarea cols="30" rows="2" placeholder="Write someting!"/>
        <IoIosAttach/>
        <FaCamera/>
        <BsEmojiSmile/>
        <IoMdSend/>
       </div>
      </div>
    </div>
}
export default ChatPanel;