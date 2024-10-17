import { useState, useEffect } from "react";
import { useLogin } from "../context/LoginProvider";

export default usePost = (resourceType, initialPage = 1) => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const { userSession } = useLogin();

  const loadPosts = async (pageNumber) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://social-network-v7j7.onrender.com/api/${resourceType}?page=${pageNumber}&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userSession.token}`
          },
        }
      );

      if (!response.ok) throw new Error("Error: Unable to fetch posts.");
      const data = await response.json();
      (data.length === 0) ? setHasMorePosts(false) : setPosts((prevPosts) => [...prevPosts, ...data]);

    } catch (error) {
      console.error("Failed to load posts:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(page);
  }, [page]);

  const loadMorePosts = () => {
    if (!isLoading && hasMorePosts) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { posts, isLoading, loadMorePosts, hasMorePosts };
};
