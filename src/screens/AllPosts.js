import { FlatList, View } from "react-native";
import Post from "../components/Post";
import usePost from "../hooks/usePost";
export default function AllPosts() {
  const resourceType = "posts";
  const { posts, loadMorePosts } = usePost(resourceType);

  const renderPost = ({ item }) => (
    <Post
      username={item.username}
      text={item.content}
      numLikes={item.likes.length}
    />
  );

  return (
    <View style={{ alignItems: "center", marginTop: 10 }}>
      <FlatList
        style={{ width: "95%" }}
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
      />
    </View>
  );
}
