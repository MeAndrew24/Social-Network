import React, { createContext, useContext, useState } from "react";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userSession, setUserSession] = useState({});

  /* 
    userSession = {
      "token": "",
      "userId": numero,
      "username": ""
    }
  */

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userSession, setUserSession }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
