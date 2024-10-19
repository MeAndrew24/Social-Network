import { useState, useEffect } from "react";
import { useLogin } from "../context/LoginProvider";

export default usePost = (resourceType) => {
  const LOAD_POST_ACTION = ["NONE", "OLD", "NEW", "INITIAL"];
  const [posts, setPosts] = useState([]);
  const [prevPage, setPrevPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [flagLoadAction, setFlagLoadAction] = useState(LOAD_POST_ACTION[3]); // Start with "NONE"
  const { userSession } = useLogin();

  // Fetch posts function
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
    const data = await fetchPosts(1); // Always load the first page for new posts

    if (!Array.isArray(data)) throw new Error("Error: Fetched data is not an array.");

    setPosts((prevPosts) => {
      const existingIds = new Set(prevPosts.map((post) => post.id));
      const newPosts = data.filter((post) => !existingIds.has(post.id));
      return [...newPosts, ...prevPosts];
    });

    setFlagLoadAction(LOAD_POST_ACTION[0]);
  };

  // Load older posts (for infinite scroll)
  const loadOlderPosts = async (pageNumber) => {
    const data = await fetchPosts(pageNumber); // Use pageNumber for older posts

    if (!Array.isArray(data)) throw new Error("Error: Fetched data is not an array.");
 
    setPosts((prevPosts) => {
      if (data.length === 0) {
        setHasMorePosts(false); // No more posts to load
        return prevPosts;
      }
      setPrevPage(pageNumber); // Update the previous page number
      const existingIds = new Set(prevPosts.map((post) => post.id));
      const newPosts = data.filter((post) => !existingIds.has(post.id));
      return [...prevPosts, ...newPosts];
    });

    setFlagLoadAction(LOAD_POST_ACTION[0]);
  };

  // Load initial posts
  const loadInitialPosts = async () => {
    const data = await fetchPosts(1); // Load the first page for the initial load

    if (!Array.isArray(data)) throw new Error("Error: Fetched data is not an array.");

    setPosts(data); // Set the posts to the result of the first page
    setPrevPage(1); // Initialize page to 1
    setFlagLoadAction(LOAD_POST_ACTION[0]);
  };

  // Single useEffect hook to manage loading actions
  useEffect(() => {
    console.log(flagLoadAction);
    // Define an async function inside the useEffect
    const handleLoadAction = async () => {
      if (flagLoadAction === "NONE") return;

      if (flagLoadAction === "INITIAL") {
        await loadInitialPosts(); // Load initial posts on mount
      }
      else if (flagLoadAction === "NEW") {
        await loadNewerPosts(); // Load newer posts
      } else if (flagLoadAction === "OLD") {
        await loadOlderPosts(prevPage + 1); // Load older posts (increment page)
      }
    };

    // Call the async function
    handleLoadAction();
  }, [flagLoadAction]); // Runs when flagLoadAction changes

  // Trigger for loading older posts (infinite scroll)
  const handleLoadPastPosts = () => {
    if (!isLoading && hasMorePosts && flagLoadAction === LOAD_POST_ACTION[0]) {
      setFlagLoadAction(LOAD_POST_ACTION[1]); // OLD: Load older posts
    }
  };

  // Trigger for loading newer posts (refresh)
  const handleLoadNewPosts = () => {
    if (!isLoading && !isFirstLoad && flagLoadAction === LOAD_POST_ACTION[0]) {
      setFlagLoadAction(LOAD_POST_ACTION[2]); // NEW: Load newer posts
    } else if (isFirstLoad) {
      setIsFirstLoad(false); // Prevent re-triggering on the first load
    }
  };

  return { 
    posts, 
    isLoading, 
    handleLoadPastPosts, 
    handleLoadNewPosts, 
    setFlagLoadAction 
  };
};
