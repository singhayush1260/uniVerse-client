import classes from './Appbar.module.scss';
import { AiOutlineMessage, AiFillCaretDown, AiFillCaretUp, AiOutlineSetting, AiOutlineSearch } from "react-icons/ai";
import { IoMdNotificationsOutline, IoIosLogOut, IoIosHeartEmpty } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { CiLight, CiDark } from "react-icons/ci";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useQuery} from "react-query";
import { logout } from '../../api/auth';
import { useQueryClient } from "react-query";
import CircularLoader from '../loaders/circular-loader/CircularLoader';
import SearchUser from '../widgets/search-user/SearchUser';
const Appbar = () => {
  
   const queryClient=useQueryClient();
   const [showDropdown, setShowDropdown] = useState(false);
   const navigate = useNavigate();
   const{ refetch, isLoading,isError,error}=useQuery("logout",logout,{
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
   const {userData}=useSelector((state)=>state.userReducer);

   return <div className={classes.appbar}>
      <div className={classes.logo_and_search}>
         <h1>UV</h1>
         {/* <input type="text" placeholder="Search user.." /> */}
         <SearchUser/>
      </div>
      <nav>
         <span className={pathname === "/" ? classes.current_nav : ""} onClick={() => navigate("/")}> <GoHomeFill /> </span>
         <span className={pathname === "/messenger" ? classes.current_nav : ""} onClick={() => navigate("/messenger")}><AiOutlineMessage /></span>
         <span className={pathname === "/notifications" ? classes.current_nav : ""} onClick={() => navigate("/notifications")}><IoMdNotificationsOutline /></span>
         <span className={pathname === "/likes" ? classes.current_nav : ""} onClick={() => navigate("/likes")}><IoIosHeartEmpty /></span>
          {/* /setting
          /community */}

      </nav>
      <div className={classes.user_menu}>
         <img src="https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532" alt="user" />
         <span>{userData?.Username}</span>
         {!showDropdown && <AiFillCaretDown onClick={() => setShowDropdown(true)} />}
         {showDropdown && <AiFillCaretUp onClick={() => setShowDropdown(false)} />}
         { showDropdown && <div className={classes.dropdown_menu}>
            <Link to="/settings">Setting</Link>
            <Link to="/user/as2">Profile</Link>
            
            <button onClick={()=>dispatch({type:'toggleTheme'})}>{isDarkTheme ? <CiLight/> : <CiDark/>}</button>
            <button onClick={()=>refetch()}>Logout <IoIosLogOut /> </button>
         </div>}
      </div>
    {isLoading && <div className={classes.logout_loader}>
     <CircularLoader/>
       <p>Logging out</p>
     </div>}
   </div>
}
export default Appbar;