import classes from './Appbar.module.scss';
import { useState,useRef,useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {useQuery, useQueryClient} from "react-query";
import {toast} from "react-toastify";
import { useGeneralContext } from '../../context/GeneralContext';
import useUser from '../../hooks/useUser';
import { logout } from '../../api/auth';
import CircularLoader from '../loaders/circular-loader/CircularLoader';
import SearchUser from '../widgets/search-user/SearchUser';
import Modal from '../modal/Modal';
import FriendRequests from '../friend-requests/FriendRequests';
import USER_FALLBACK from "../../assets/images/dummy_user.png"
import { AiOutlineMessage, AiFillCaretDown, AiFillCaretUp, AiOutlineSetting, AiOutlineSearch } from "react-icons/ai";
import { IoMdNotificationsOutline, IoIosLogOut, IoIosHeartEmpty,IoMdSearch } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { CiLight, CiDark } from "react-icons/ci";
const Appbar = () => {
   const dropdownRef = useRef();
   const queryClient=useQueryClient();
   const [showDropdown, setShowDropdown] = useState(false);
   const [showRequestModal, setShowRequestModal] = useState(false);
   const navigate = useNavigate();
   const {user:currentUser}=useUser();
   const{ refetch, isLoading:loggingOut,isError,error}=useQuery("logout",logout,{
      enabled:false,
      onSuccess:async()=>{
           navigate("/login");
           await queryClient.invalidateQueries("validateToken");
           queryClient.removeQueries({ queryKey: "validateToken" });
           //dispatch({type:'logout'})
      },
      onError:()=>{
        toast("Error creating post.", {
          position: "top-center",
          theme: "dark",
          type: "error",
          autoClose: 3000,
        });
      }
    });
   const location = useLocation();
   
   const pathname = location.pathname;
   
   const{theme,toggleTheme}=useGeneralContext();

   

useEffect(() => {
   const clickOutside = (e) => {
     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
       setShowDropdown(false);
     }
   };
   document.addEventListener("click", clickOutside, true);
   return () => document.removeEventListener("click", clickOutside, true);
 }, []);

   return <div className={classes.appbar}>
      <div className={classes.logo_and_search}>
         <h1> <Link to="/">UV</Link> </h1>
         {/* <input type="text" placeholder="Search user.." /> */}
         <SearchUser currentUser={currentUser}/>
      </div>
      <nav>
         <span className={pathname === "/" ? classes.current_nav : ""} onClick={() => navigate("/")}> <GoHomeFill /> </span>
         <span className={pathname === "/messenger" ? classes.current_nav : ""} onClick={() => navigate("/messenger")}><AiOutlineMessage /></span>
         <span className={pathname === "/notifications" ? classes.current_nav : ""} onClick={() => navigate("/notifications")}><IoMdNotificationsOutline /></span>
         {/* <span className={pathname === "/likes" ? classes.current_nav : ""} onClick={() => navigate("/likes")}><IoIosHeartEmpty /></span> */}
          {/* /setting
          /community */}

      </nav>
      <div className={classes.user_menu}>
         <img src={currentUser?.Avatar || USER_FALLBACK} alt="user" />
         <span>{currentUser?.Name}</span>
         {!showDropdown && <AiFillCaretDown onClick={() => setShowDropdown(true)} />}
         {showDropdown && <AiFillCaretUp onClick={() => setShowDropdown(false)} />}
         { showDropdown && <div className={classes.dropdown_menu_container} ref={dropdownRef}>
           <div>
           <Link to="/settings">Setting</Link>
           </div>
            <div>
            <div onClick={()=>navigate(`/user/${currentUser?.Username}`, { state: { user:currentUser } })}>Profile</div>
            </div>
            <div onClick={()=>setShowRequestModal(true)}>Requests</div>
            <button onClick={()=>toggleTheme()}>{theme==="light" ? <CiLight/> : <CiDark/>}</button>
            <button disabled={loggingOut} onClick={()=>refetch()}>Logout <IoIosLogOut /> </button>
            {/* <DropdownMenu menu={menu} showDropdownArg={showDropdown} onClose={()=>setShowDropdown(false)}/> */}
         </div>}
      </div>
      {showRequestModal && <Modal isOpened={showRequestModal} onClose={()=>setShowRequestModal(false)}><FriendRequests/> </Modal>}
    {loggingOut && <div className={classes.logout_loader}>
     <CircularLoader/>
       <p>Logging out</p>
     </div>}
   </div>
}
export default Appbar;