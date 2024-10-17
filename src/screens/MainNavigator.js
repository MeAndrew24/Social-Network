import React, { useContext } from "react";
import { useLogin } from "../context/LoginProvider";
import NavTab from "./NavTab";
import Navlog from "./Navlog";

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <NavTab /> : <Navlog />;
};

export default MainNavigator;
