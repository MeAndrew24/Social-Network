import { VirtualizedList, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../context/LoginProvider";
import Post from "../components/Post";
import ProfilePic from "../components/ProfilePic";
import NewPostButton from "../components/NewPostButton";
import usePost from "../hooks/usePost";
import useUser from "../hooks/useUser";


export default function Profile() {
  const PROFILE_PIC_PAGE_SIZE = 72;
  const { userInfo } = useUser();
  const { userSession } = useLogin();

  const resourceType = `users/${userSession.userId}/posts`;
  const { posts, handleLoadPastPosts, handleLoadNewPosts } = usePost(resourceType);
  const getItem = (data, index) => data[index];
  const getItemCount = (data) => data.length;
  const navigation = useNavigation();

  const renderPost = ({ item }) => (
    <Post
      username={item.username}
      text={item.content}
      numLikes={item.likes.length}
    />
  );

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
            ListHeaderComponent={
              <Text style={styles.subtitle}>Posts</Text>
            }
          />
          <NewPostButton
            onPress={() => navigation.navigate("Share Your Thoughts")}
          />
        </View>
      </View>
    </View>
  );
}

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
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
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