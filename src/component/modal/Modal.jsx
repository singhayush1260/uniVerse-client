import { useState } from 'react';
import classes from './Modal.module.scss'
import { createPortal } from "react-dom";
const Modal=({children, isOpened=false})=>{

const modalElement=document.getElementById('modal');

//const[isOpened, setIsOpened]=useState(false);

return createPortal(
   isOpened ? <div className={classes.modal}>{children}</div> : null,
    modalElement
)
}
export default Modal;