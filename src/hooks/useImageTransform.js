
const useImageTransform = () => {
    const TO_RADIANS = Math.PI / 180;
  
    const crop = (image, previewCanvasRef, crop, scale = 1, rotate = 0) => {
      console.log("image", image);
      console.log("canvas", previewCanvasRef);
      console.log("crop", crop);
      let canvas;
      if (previewCanvasRef === null) {
        canvas = document.createElement("canvas");
      } else {
        canvas = previewCanvasRef;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("No 2d context");
      }
  
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const pixelRatio = window.devicePixelRatio;
  
      canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
      canvas.height = Math.floor(crop.height * scaleY * pixelRatio);
  
      ctx.scale(pixelRatio, pixelRatio);
      ctx.imageSmoothingQuality = "high";
  
      const cropX = crop.x * scaleX;
      const cropY = crop.y * scaleY;
  
      const rotateRads = rotate * TO_RADIANS;
      const centerX = image.naturalWidth / 2;
      const centerY = image.naturalHeight / 2;
  
      ctx.save();
      ctx.translate(-cropX, -cropY);
      ctx.translate(centerX, centerY);
      ctx.rotate(rotateRads);
      ctx.scale(scale, scale);
      ctx.translate(-centerX, -centerY);
      ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight
      );
  
      ctx.restore();
  
      return canvas.toDataURL("image/jpeg");
    };
  
    const resize = (imageURL, width, height) => {
      const canvas = document.createElement("canvas");
      const image = new Image();
      image.src = imageURL;
  
      return new Promise((resolve, reject) => {
        image.onload = () => {
          const ctx = canvas.getContext("2d");
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(image, 0, 0, width, height);
          try {
            const resizedImageDataURL = canvas.toDataURL("image/jpeg", 0.8);
            resolve(resizedImageDataURL);
            console.log("Successfully Resized");
          } catch (error) {
            reject(error);
            console.log("Error while resizing.");
          }
        };
      });
    };
  
    const rotate = (imageURL, canvas, degree = 1) => {
      const context = canvas.getContext("2d");
      const image = new Image();
      image.src = imageURL;
  
      return new Promise((resolve, reject) => {
        image.onload = () => {
          // Calculate dimensions to fit the rotated image
          const rotatedWidth =
            Math.abs(image.width * Math.cos(degree)) +
            Math.abs(image.height * Math.sin(degree));
          const rotatedHeight =
            Math.abs(image.width * Math.sin(degree)) +
            Math.abs(image.height * Math.cos(degree));
  
          canvas.width = rotatedWidth;
          canvas.height = rotatedHeight;
  
          const offsetX = (rotatedWidth - image.width) / 2;
          const offsetY = (rotatedHeight - image.height) / 2;
  
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.save();
          context.translate(canvas.width / 2, canvas.height / 2);
          context.rotate(TO_RADIANS * degree);
          context.drawImage(
            image,
            -image.width / 2 + offsetX,
            -image.height / 2 + offsetY
          );
          context.restore();
  
          try {
            const rotatedImageDataURL = canvas.toDataURL();
            resolve(rotatedImageDataURL);
            console.log("Successfully Rotated");
          } catch (error) {
            reject(error);
          }
        };
      });
    };
  
    return { crop, resize, rotate };
  };
  export default useTransform;