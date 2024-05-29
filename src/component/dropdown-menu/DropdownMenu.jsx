import classes from "./DropdownMenu.module.scss";
import { useState,useRef,useEffect } from "react";
import { motion,AnimatePresence } from "framer-motion";
const DropdownMenu=({showDropdownArg,onClose, menu})=>{
    const[showDropdown,setShowDropdown]=useState(showDropdownArg);
    const dropdownRef = useRef();
    useEffect(() => {
        const clickOutside = (e) => {
          if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowDropdown(false);
            onClose();
          }
        };
        document.addEventListener("click", clickOutside, true);
        return () => document.removeEventListener("click", clickOutside, true);
      }, []);

return(
<>
{ showDropdown && <AnimatePresence>
       <motion.div className={classes.dropdown_menu} ref={dropdownRef}
    initial={{ y: "-80px" }}
    animate={{ y: "10px" }}
    exit={{ y: "-0px" }}
    transition={{ duration: 0.5 }}>
        {menu.map((m)=>{
            return <div key={m?._id}>{m?.body}</div>
        })}
    </motion.div>
 </AnimatePresence>}
</>
)
}
export default DropdownMenu;