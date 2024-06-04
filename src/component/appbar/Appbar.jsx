import classes from './Appbar.module.scss';
import { AiOutlineMessage, AiFillCaretDown, AiFillCaretUp, AiOutlineSetting, AiOutlineSearch } from "react-icons/ai";
import { IoMdNotificationsOutline, IoIosLogOut, IoIosHeartEmpty } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { CiLight, CiDark } from "react-icons/ci";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState,useRef,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useQuery} from "react-query";
import { logout } from '../../api/auth';
import { useQueryClient } from "react-query";
import CircularLoader from '../loaders/circular-loader/CircularLoader';
import SearchUser from '../widgets/search-user/SearchUser';
import DropdownMenu from '../dropdown-menu/DropdownMenu';
import Modal from '../modal/Modal';
import FriendRequests from '../friend-requests/FriendRequests';
import useUser from '../../hooks/useUser';
import USER_FALLBACK from "../../assets/images/dummy_user.png"
import { useGeneralContext } from '../../context/GeneralContext';
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
           console.log("logout success")
           navigate("/login");
           await queryClient.invalidateQueries("validateToken");
           queryClient.removeQueries({ queryKey: "validateToken" });
           //dispatch({type:'logout'})
      },
      onError:()=>{
  
      }
    });
   const location = useLocation();
   
   const pathname = location.pathname;
   
   const dispatch=useDispatch();
   const {isDarkTheme}=useSelector((state)=>state.themeReducer);
   const{toggleTheme}=useGeneralContext();

   const menu=[{_id:1,body:<Link to="/settings">Setting</Link>},
{_id:2,body:<Link to="/user/as2">Profile</Link>},
{_id:3,body:<div onClick={()=>setShowRequestModal(true)}>Requests</div>},
{_id:4,body:<button onClick={()=>dispatch({type:'toggleTheme'})}>{isDarkTheme ? <CiLight/> : <CiDark/>}</button>},
{_id:5,body:<button onClick={()=>refetch()}>Logout <IoIosLogOut /> </button>}]

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
            <Link to={`/user/${currentUser?.Username}`}>Profile</Link>
            </div>
            <div onClick={()=>setShowRequestModal(true)}>Requests</div>
            <button onClick={()=>toggleTheme()}>{isDarkTheme ? <CiLight/> : <CiDark/>}</button>
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