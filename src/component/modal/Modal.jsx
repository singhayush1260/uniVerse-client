import { useState, useRef, useEffect } from 'react';
import classes from './Modal.module.scss';
import { createPortal } from 'react-dom';

const Modal = ({ children, isOpened, onClose }) => {
  const modalRef = useRef();
  const modalElement = document.getElementById('modal');
  
  const [isModalOpened, setIsModalOpened] = useState(isOpened);

  useEffect(() => {
    setIsModalOpened(isOpened);
  }, [isOpened]);

  useEffect(() => {
    if (!isModalOpened) return;

    const clickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpened(false);
        onClose();
      }
    };

    document.addEventListener('click', clickOutside, true);
    return () => document.removeEventListener('click', clickOutside, true);
  }, [isModalOpened, onClose]);

  return createPortal(
    isModalOpened ? (
      <div className={classes.modal}>
        <div className={classes.close_button}>X</div>
        <div className={classes.children_container} ref={modalRef}>
          
          {children}</div>
      </div>
    ) : null,
    modalElement
  );
};

export default Modal;
