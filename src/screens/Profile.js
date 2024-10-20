import { VirtualizedList, View, Text, StyleSheet, ActivityIndicator, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useLogin } from "../context/LoginProvider";
import Post from "../components/Post";
import ProfilePic from "../components/ProfilePic";
import usePost from "../hooks/usePost";
import useUser from "../hooks/useUser";
import useFollow from "../hooks/useFollow";

export default function Profile() {
  const PROFILE_PIC_PAGE_SIZE = 72;
  const { userSession } = useLogin();

  const id = useRoute()?.params?.userID || userSession.userId;
  const { userInfo, isLoading, error, isMe } = useUser(id);
  const resourceType = `users/${id}/posts`;
  const { posts, handleLoadPastPosts, handleLoadNewPosts } = usePost(resourceType); 
  const { handleFollow } = useFollow(id);

  const getItem = (data, index) => data[index];
  const getItemCount = (data) => data.length;
  const navigation = useNavigation();
  const renderPost = ({ item }) => (
    <Post
      username={item.username}
      text={item.content}
      numLikes={item.likes.length}
      postId={item.id}
      onEditPress={() =>
        navigation.navigate("Share Your Thoughts", {
          postId: item.id,
          currentText: item.content,
        })
      }
      onDeletePress={() =>
        navigation.navigate("Delete Thought Confirmation", {
          postId: item.id,
        })
      }
    />
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!userInfo) return null;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <ProfilePic username={userInfo.username} size={PROFILE_PIC_PAGE_SIZE}/> 
        <Text style={styles.username}>{userInfo.username}</Text>
        <View style={styles.followingRow}>
          <View style={{ flexDirection: "row" }}>
            <Text>Followers: </Text>
            <Text>{userInfo?.follower_count}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Following: </Text>
            <Text>{userInfo?.following_count}</Text>
          </View>
        </View>
        {!isMe && (
          <Button 
            title={userInfo?.is_following ? "Unfollow" : "Follow"} 
            onPress={() => handleFollow(userInfo.is_following, userInfo.id)}
          />
        )}
      </View>
      <View style={styles.postSide}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 10 }}>
          <VirtualizedList
            style={{ width: "96%" }}
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id.toString()}
            getItem={getItem}
            getItemCount={getItemCount}
            onEndReached={handleLoadPastPosts}
            onEndReachedThreshold={0.1}
            onStartReached={handleLoadNewPosts}
            onStartReachedThreshold={0.1}
            ListHeaderComponent={<Text style={styles.subtitle}>Posts</Text>}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#fbfbfb",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  profilePic: {
    borderRadius: 64,
    justifyContent: "center",
    height: 64,
    width: 64,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  followingRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "52%",
  },
  subtitle: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  postSide: {
    width: "100%",
    flex: 3.5,
  },
  capitalLetter: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
  followButton: {
    
  }
});
