import React from "react";
import { FlatList, View } from "react-native";
import Post from "../components/Post";
import usePost from "../hooks/usePost";
import NewPostButton from "../components/NewPostButton";
import { useNavigation } from "@react-navigation/native";

export default function Following() {
  const resourceType = "feed";
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
    <View View style={{ flex: 1,alignItems: "center", marginTop: 10 }}>
      <FlatList
        style={{ width: "95%" }}
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
