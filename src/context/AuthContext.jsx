import { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { validateToken } from "../api/auth";

const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
  const { data } = useQuery("validateToken", validateToken, { retry: false });
  const contextValue = {
    isLoggedIn: !!data?.userId,
    currentUserId: data?.userId 
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};
