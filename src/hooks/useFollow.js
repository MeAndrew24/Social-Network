import { useState, useEffect } from "react";
import { useLogin } from "../context/LoginProvider";

export default useFollow = (userID) => {
  const { userSession } = useLogin();
  const [method, setMethod] = useState[""];

  const followLogic = async (userID) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://social-network-v7j7.onrender.com/api/users/${userID}/follow`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userSession.token}`,
          },
        }
      );

      if (!response.ok) 
        throw new Error("Error: Unable to fetch posts.");

    } catch (error) {
      console.error("Failed to load posts:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollow = async (isFollow, id) => {
    (!isFollow) ? setMethod("PUT") : setMethod("DELETE")
    await followLogic(id);
  }

  return { handleFollow }
}