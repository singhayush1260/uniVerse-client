import { useState, useCallback } from "react";
import { uploadToCloudinary as uploadToCloudinaryApi } from "../api/post";
const CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const useCloudinary = ({ onSuccess, onError }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const upload = useCallback(async (images) => {
    if (!images || images.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const uploadPromises = images.map((image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        formData.append("cloud_name", CLOUDINARY_NAME);
        return uploadToCloudinaryApi(formData);
      });

      const results = await Promise.all(uploadPromises);

      setData(results);
      setIsLoading(false);

      if (onSuccess) {
        onSuccess(results);
      }
    } catch (err) {
      setError(err);
      setIsLoading(false);

      if (onError) {
        console.log("onError inside hook")
        onError(err);
      }
    }
  }, [onSuccess, onError]);

  return { upload, data, isLoading, error };
};

export default useCloudinary;
