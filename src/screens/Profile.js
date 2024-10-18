import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useLogin } from "../context/LoginProvider";
import Post from "../components/Post";
import ProfilePic from "../components/ProfilePic";
import usePost from "../hooks/usePost";
import useUser from "../hooks/useUser";

function Profile() {
  const PROFILE_PIC_PAGE_SIZE = 72;
  const { userInfo, isLoading, error: userError } = useUser();
  const { userSession } = useLogin();

  const resourceType = `users/${userSession.userId}/posts`;
  const { posts, loadMorePosts } = usePost(resourceType);

  const renderPost = ({ item }) => (
    <Post
      username={item.username}
      text={item.content}
      numLikes={item.likes.length}
    />
  );

  if (userError) return <Text>Error: {userError}</Text>;
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3066BE" />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.arriba}>
        <ProfilePic username={userSession.username} size={PROFILE_PIC_PAGE_SIZE}/> 

        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            width: "52%",
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text>Followers: </Text>
            <Text>{userInfo?.follower_count}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text>Following: </Text>
            <Text>{userInfo?.following_count}</Text>
          </View>
        </View>
      </View>
      <View style={styles.abajo}>
        <Text style={styles.subtitle}>Posts</Text>
        <View style={{ alignItems: "center" }}>
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
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  arriba: {
    backgroundColor: "#fbfbfb",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    borderRadius: 64,
    justifyContent: "center",
    height: 64,
    width: 64,
  },
  subtitle: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "400",
  },
  abajo: {
    width: "100%",
    flex: 3.5,
  },
  capitalLetter: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
});
