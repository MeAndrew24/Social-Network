import { useState } from "react";
import { useLogin } from "../context/LoginProvider";
import { useUser } from "../hooks/useUser";

const useFollow = (userID, setIsUpdated, isUpdated) => {
  const { userSession } = useLogin();
  const [method, setMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const followLogic = async () => {
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
        throw new Error("Error: Unable to follow/unfollow user.");
    } catch (error) {
      console.error("Failed to follow/unfollow user:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollow = async (isFollow) => {
    setMethod(!isFollow ? "PUT" : "DELETE");
    await followLogic();
    setIsUpdated(!isUpdated);
  }

  return { handleFollow, isLoading };
};

export default useFollow;
