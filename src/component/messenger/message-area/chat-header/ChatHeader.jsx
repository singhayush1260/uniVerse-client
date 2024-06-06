import classes from "./ChatHeader.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoEllipsisVertical } from "react-icons/io5";
import LazyImage from "../../../lazy-image/LazyImage";
import { IoIosArrowForward } from "react-icons/io";
import CircularLoader from "../../../loaders/circular-loader/CircularLoader";
import { useGeneralContext } from "../../../../context/GeneralContext";
import {getIceBreaker} from "../../../../api/chat";
import useIceBreaker from "../../../../hooks/useIceBreaker";
import { useSocketContext } from "../../../../context/SocketContext";
const ChatHeader = ({currentUser, currentChat, showSidebar, setShowSidebar }) => {
  const{socket}=useSocketContext();
  const{setIceBreaker}=useGeneralContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const userId=currentChat?.Members[0]?._id;
  // const { error, isLoading,refetch,isFetching } = useQuery(["getIceBreaker", userId], () => getIceBreaker(userId), {
  //   enabled:!!userId,
  //   onSuccess:(data)=>{
  //     // console.log("ice breakeer data",data);
  //     // console.log("efsfrgreg",data?.text[0]?.split(","));
  //     setIceBreaker(data?.text[0]?.trim()?.split("\n"));
  //   }
  // });
  const{iceBreakers,fetchIceBreakers,fetchingIceBreakers,iceBreakersLoading,error}=useIceBreaker(userId,{
    postFetch:()=>{
      setIceBreaker(iceBreakers);
    },
    onError:()=>{
      toast("Could not get ice breakers", {
        position: "top-center",
        theme: "dark",
        type: "error",
        autoClose: 2000,
      });
    }
  });

  

  useEffect(() => {
    const clickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", clickOutside, true);
    return () => document.removeEventListener("click", clickOutside, true);
  }, []);

  const deleteGroup = useCallback(() => {
    socket?.emit("delete-group",{userID:currentUser?._id,groupID:currentChat?._id});
   },[socket,currentChat,currentUser]);
 
  return (
    <div className={classes.chat_header}>
      {/* {!showSidebar && (
        <button className={classes.sidebar_button} onClick={() => setShowSidebar()}>
          <IoIosArrowForward />
        </button>
      )} */}
      <div className={classes.user_detail}>
        <div className={classes.image_container}>
          <LazyImage src={currentChat?.Members[0]?.Avatar} />
        </div>
        <div>
          <Link to={`/user/${currentChat?.Members[0]?.Username}`} >{currentChat?.Members[0]?.Name}</Link>
          {/* <p>last seen at 12:34 AM</p> */}
        </div>
      </div>
      <div className={classes.menu}>
        <IoEllipsisVertical onClick={() => setShowDropdown(!showDropdown)} />
        {showDropdown && (
          <div className={classes.dropdown} ref={dropdownRef}>
            <button disabled={fetchingIceBreakers} onClick={()=>fetchIceBreakers()}>{fetchingIceBreakers ? <CircularLoader/>: "Get Ice Breaker"}</button>
            {/* <button onClick={() => leaveGroup()}>Leave</button>
            <button onClick={() => deleteGroup()}>Delete</button> */}
          </div>
        )}
      </div>
    </div>
  );
};
export default ChatHeader;
