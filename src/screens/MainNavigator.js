import React, { useContext } from "react";
import { useLogin } from "../context/LoginProvider";
import NavMain from "./NavMain";
import NavLogin from "./NavLogin";

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <NavMain /> : <NavLogin />;
};

export default MainNavigator;
