import React, { useState } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import ProfilePic from "../components/ProfilePic";
import {
  faEdit,
  faPenToSquare,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";

export default Post = ({
  userID,
  username,
  text,
  numLikes,
  postId, // Cuando es Post del User recibe el post.id, cuando no, recibe -1
  onEditPress,
  onDeletePress,
}) => {
  const PROFILE_PIC_POST_SIZE = 36;
  const [btnLikePressed, setBtnLikePressed] = useState(false);
  const [btnLikeColor, setBtnLikeColor] = useState("");

  const handlePressLikeBtn = () => {
    setBtnLikePressed(!btnLikePressed);
    btnLikePressed ? setBtnLikeColor("red") : setBtnLikeColor("");
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.row}>
          <Text style={styles.username}>{username}</Text>
        </View>
        <View style={styles.row}>
          <ProfilePic userID={userID} username={username} size={PROFILE_PIC_POST_SIZE}/>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.row}>
          <Pressable onPress={handlePressLikeBtn}>
            <FontAwesomeIcon icon={faHeart} color={btnLikeColor} />
          </Pressable>
          <Text>{numLikes} likes</Text>
        </View>
      </View>

      {postId ? (
        <View style={styles.editDelete}>
          <Pressable onPress={onDeletePress}>
            <FontAwesomeIcon icon={faTrashAlt} color="grey" size={20} />
          </Pressable>
          <Pressable onPress={onEditPress}>
            <FontAwesomeIcon icon={faEdit} color="black" size={20} />
          </Pressable>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "gainsboro",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    shadowColor: "black",
    shadowOffset: { height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 3,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "space-evenly",
  },
  row: {
    flexDirection: "row",
    columnGap: 10,
    paddingBottom: 5,
    alignItems: "center",
  },
  username: {
    color: "black",
    textAlign: "left",
    fontWeight: "bold",
  },
  profilePic: {
    borderRadius: 64,
    justifyContent: "center",
    height: 36,
    width: 36,
  },
  capitalLetter: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    flexShrink: 1,
  },
  editDelete: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    paddingTop: 10,
    margin: 10,
  },
});
