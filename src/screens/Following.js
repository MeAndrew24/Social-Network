import React from "react";
import { VirtualizedList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Post from "../components/Post";
import usePost from "../hooks/usePost";
import NewPostButton from "../components/NewPostButton";

export default function Following() {
  const resourceType = "feed";
  const { posts, handleLoadPastPosts, handleLoadNewPosts } =
    usePost(resourceType);
  const navigation = useNavigation();

  const getItem = (data, index) => data[index];
  const getItemCount = (data) => data.length;
  const renderPost = ({ item }) => (
    <Post
      userID={item.user_id}
      username={item.username}
      text={item.content}
      numLikes={item.likes.length}
    />
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <VirtualizedList
        style={{ width: "100%" }}
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        getItem={getItem}
        getItemCount={getItemCount}
        onEndReached={handleLoadPastPosts}
        onEndReachedThreshold={0.1}
        onStartReached={handleLoadNewPosts}
        onStartReachedThreshold={0.1}
      />
      <NewPostButton
        onPress={() =>
          navigation.navigate("Share Your Thoughts", {
            postId: -1,
            currentText: "",
          })
        }
      />
    </View>
  );
}
