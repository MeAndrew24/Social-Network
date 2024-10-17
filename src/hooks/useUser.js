import { useState, useEffect } from "react";
import { useLogin } from "../context/LoginProvider";

const useUser = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userSession } = useLogin();
  const [userColor, setUserColor] = useState("black");
  const colorPorLetraMap = new Map([
    ["A", "red"],
    ["B", "blue"],
    ["C", "green"],
    ["D", "yellow"],
    ["E", "purple"],
    ["F", "orange"],
    ["G", "pink"],
    ["H", "brown"],
    ["I", "gray"],
    ["J", "cyan"],
    ["K", "magenta"],
    ["L", "lime"],
    ["M", "navy"],
    ["N", "teal"],
    ["O", "coral"],
    ["P", "violet"],
    ["Q", "gold"],
    ["R", "silver"],
    ["S", "olive"],
    ["T", "crimson"],
    ["U", "indigo"],
    ["V", "khaki"],
    ["W", "lavender"],
    ["X", "salmon"],
    ["Y", "peach"],
    ["Z", "plum"],
  ]);
  const fetchUserInfo = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://social-network-v7j7.onrender.com/api/users/${userSession.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userSession.token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error: Unable to fetch user data.");
      const data = await response.json();
      console.log(data);
      setUserInfo(data);
      const firstLetter = data.username[0].toUpperCase();
      const color = colorPorLetraMap.get(firstLetter);
      setUserColor(color);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [userSession.userId]);

  return { userInfo, isLoading, error, userColor };
};

export default useUser;
