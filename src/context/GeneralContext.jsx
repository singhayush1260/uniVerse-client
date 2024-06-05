import { createContext, useContext, useState } from "react";
import {comments as commentsData} from "../contants/comments";
const GeneralContext = createContext(undefined);

export const GeneralContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [iceBreaker, setIceBreaker] = useState([]);
  const [comments, setComments] = useState(commentsData);
  
  const toggleTheme=()=>{
    if(theme==="dark"){
      setTheme("light");
    }else{
      setTheme("dark")
    }
  }

  const addComment=(newComment)=>{
    console.log("new comment",newComment)
    setComments((comment)=>[...comment,newComment]);
  }

  const contextValue = {
    theme,
    toggleTheme,
    iceBreaker,
    setIceBreaker,
    comments,
    addComment
  };

  return (
    <GeneralContext.Provider value={contextValue}>
      {children}
    </GeneralContext.Provider>
  );
};
export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("useGeneralContext must be used within a GeneralContextProvider");
  }
  return context;
};
