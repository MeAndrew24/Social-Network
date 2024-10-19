import { useState, useEffect } from "react";
import { useLogin } from "../context/LoginProvider";

export default useUser = (userID) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMe, setIsMe] = useState(false);
  const { userSession } = useLogin();
  
  const fetchUserInfo = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://social-network-v7j7.onrender.com/api/users/${userID}`,
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
      userID === userSession.userId ? setIsMe(true) : setIsMe(false);
      setUserInfo(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [userID]);

  return { userInfo, isLoading, error, isMe };
};