import { useState, useEffect } from "react";
import { useLogin } from "../context/LoginProvider";

export default useUser = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userSession } = useLogin();
  
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
      setUserInfo(data);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [userSession.userId]);

  return { userInfo, isLoading, error };
};