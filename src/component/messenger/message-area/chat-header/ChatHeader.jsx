import classes from "./ChatHeader.module.scss";
import { IoEllipsisVertical } from "react-icons/io5";
import LazyImage from "../../../lazy-image/LazyImage";
import { IoIosArrowForward } from "react-icons/io";
const ChatHeader=({currentChat, showSidebar,setShowSidebar})=>{
return(
    <div className={classes.chat_header}>
    {!showSidebar &&  <button onClick={()=>setShowSidebar()}> <IoIosArrowForward/> </button>}
        <div className={classes.user_detail}>
          <div className={classes.image_container}>
            <LazyImage src="https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532" />
          </div>
          <div>
            <p>{currentChat?.Name}</p>
            <p>last seen at 12:34 AM</p>
          </div>
        </div>
        <div className={classes.menu}>
          <IoEllipsisVertical />
        </div>
      </div>
)
}
export default ChatHeader;