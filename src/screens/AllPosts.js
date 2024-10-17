import React from "react";
import { FlatList, View } from "react-native";
import Post from "../components/Post";
import usePost from "../hooks/usePost";
import NewPostButton from "../components/NewPostButton";
import { useNavigation } from "@react-navigation/native";

export default function AllPosts() {
  const resourceType = "posts";
  const { posts, loadMorePosts } = usePost(resourceType);
  const navigation = useNavigation();

  const renderPost = ({ item }) => (
    <Post
      username={item.username}
      text={item.content}
      numLikes={item.likes.length}
    />
  );

  return (
    <View
      View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
      />
      <NewPostButton
        onPress={() => navigation.navigate("Share Your Thoughts")}
      />
    </View>
  );
}
