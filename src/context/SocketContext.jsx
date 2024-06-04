import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const SocketContext = createContext(null);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};

export const SocketContextProvider = ({ children }) => {
  const { isLoggedIn, currentUserId } = useAuthContext();
  const [socket, setSocket] = useState(null);
  //console.log("socket 1",isLoggedIn,currentUserId)
  useEffect(() => {
    if (isLoggedIn && currentUserId ) {
      //console.log("socket 2",isLoggedIn)
      const newSocket = io(API_URL);
      //newSocket.emit("mark online", currentUserId);
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    } else {
      setSocket(null);
    }
  }, [isLoggedIn,currentUserId]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
