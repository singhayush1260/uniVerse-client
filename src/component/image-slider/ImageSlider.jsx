import React, { useState } from "react";
import { motion } from "framer-motion";
import classes from "./ImageSlider.module.scss";
import LazyImage from "../lazy-image/LazyImage";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className={classes.image_slider_container}>
      {images?.length > 1 && (
        <MdOutlineKeyboardArrowLeft
          className={classes.left_button}
          onClick={goToPrevious}
        />
      )}
      <motion.div
        className={classes.image_wrapper}
        key={currentIndex} // Ensure motion component re-renders when currentIndex changes
        initial={{ x: "-100px" }}
        animate={{ x: "0px" }}
        exit={{ x: "0px" }}
        transition={{ duration: 0.8 }} // Transition duration
      >
        <LazyImage src={images[currentIndex]} />
      </motion.div>
      {images?.length > 1 && (
        <MdOutlineKeyboardArrowRight
          className={classes.right_button}
          onClick={goToNext}
        />
      )}
    </div>
  );
};

export default ImageSlider;
