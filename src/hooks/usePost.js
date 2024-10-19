import { useState, useEffect } from "react";
import { useLogin } from "../context/LoginProvider";

export default usePost = (resourceType) => {
  const LOAD_POST_ACTION = ["NONE", "OLD", "NEW", "INITIAL"];
  const [posts, setPosts] = useState([]);
  const [prevPage, setPrevPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [flagLoadAction, setFlagLoadAction] = useState(LOAD_POST_ACTION[3]);
  const { userSession } = useLogin();

  const fetchPosts = async (pageNumber) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://social-network-v7j7.onrender.com/api/${resourceType}?page=${pageNumber}&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userSession.token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error: Unable to fetch posts.");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to load posts:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Load newer posts (for refreshing)
  const loadNewerPosts = async () => {
    const data = await fetchPosts(1); 

    if (!Array.isArray(data))
      throw new Error("Error: Fetched data is not an array.");

    setPosts((prevPosts) => {
      const existingPostsMap = new Map(
        prevPosts.map((post) => [post.id, post])
      );

      const newPostIds = new Set(data.map((post) => post.id));

      const newOrUpdatedPosts = data.filter((post) => {
        const existingPost = existingPostsMap.get(post.id);
        return !existingPost || existingPost.content !== post.content;
      });

      const updatedPosts = prevPosts
        .map((post) => {
          const newPost = newOrUpdatedPosts.find((p) => p.id === post.id);
          return newPost ? newPost : post;
        })
        .filter((post) => newPostIds.has(post.id));

      return [
        ...newOrUpdatedPosts.filter((post) => !existingPostsMap.has(post.id)),
        ...updatedPosts,
      ];
    });

    setFlagLoadAction(LOAD_POST_ACTION[0]);
  };

  // Load older posts (for infinite scroll)
  const loadOlderPosts = async (pageNumber) => {
    const data = await fetchPosts(pageNumber); 

    if (!Array.isArray(data))
      throw new Error("Error: Fetched data is not an array.");

    setPosts((prevPosts) => {
      if (data.length === 0) {
        setHasMorePosts(false);
        return prevPosts;
      }
      setPrevPage(pageNumber);
      const existingIds = new Set(prevPosts.map((post) => post.id));
      const newPosts = data.filter((post) => !existingIds.has(post.id));
      return [...prevPosts, ...newPosts];
    });

    setFlagLoadAction(LOAD_POST_ACTION[0]);
  };


  const loadInitialPosts = async () => {
    const data = await fetchPosts(1); 

    if (!Array.isArray(data))
      throw new Error("Error: Fetched data is not an array.");

    setPosts(data);
    setFlagLoadAction(LOAD_POST_ACTION[0]);
  };

  // Define an async function to use into the useEffect
  const handleLoadAction = async () => {
    if (flagLoadAction === "NONE") return;
    if (flagLoadAction === "INITIAL") await loadInitialPosts();
    else if (flagLoadAction === "NEW") await loadNewerPosts(); 
    else if (flagLoadAction === "OLD") await loadOlderPosts(prevPage + 1);
  };

  // Single useEffect hook to manage loading actions
  useEffect(() => {
    handleLoadAction();
  }, [flagLoadAction]);

  // Trigger for loading older posts (infinite scroll)
  const handleLoadPastPosts = () => {
    if (!isLoading && hasMorePosts && flagLoadAction === LOAD_POST_ACTION[0]) {
      setFlagLoadAction(LOAD_POST_ACTION[1]); 
    }
  };

  // Trigger for loading newer posts (refresh)
  const handleLoadNewPosts = () => {
    if (!isLoading && !isFirstLoad && flagLoadAction === LOAD_POST_ACTION[0]) {
      setFlagLoadAction(LOAD_POST_ACTION[2]);
    } else if (isFirstLoad) {
      setIsFirstLoad(false);
    }
  };

  return { posts, isLoading, handleLoadPastPosts, handleLoadNewPosts, setFlagLoadAction };
};