import { createContext, useContext, useState } from "react";
const GeneralContext = createContext(undefined);

export const GeneralContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [iceBreaker, setIceBreaker] = useState([]);
  
  const toggleTheme=()=>{
    if(theme==="dark"){
      setTheme("light");
    }else{
      setTheme("dark")
    }
  }

  const contextValue = {
    theme,
    toggleTheme,
    iceBreaker,
    setIceBreaker
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
