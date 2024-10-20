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
  postId,
  onEditPress,
  onDeletePress,
  isMe,
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
          <ProfilePic
            userID={userID}
            username={username}
            size={PROFILE_PIC_POST_SIZE}
          />
          <View style={[styles.row, styles.juntar]}>
            <Text style={styles.username}>{username}</Text>
            {isMe && postId ? (
              <View style={styles.editDelete}>
                <Pressable onPress={onDeletePress} style={{ marginRight: 15 }}>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    color="#FF4242"
                    size={20}
                  />
                </Pressable>
                <Pressable onPress={onEditPress}>
                  <FontAwesomeIcon icon={faEdit} color="#F1A208" size={20} />
                </Pressable>
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.text}>{text}</Text>
          <View style={styles.row}>
            <Pressable onPress={handlePressLikeBtn}>
              <FontAwesomeIcon icon={faHeart} color={btnLikeColor} />
            </Pressable>
            <Text>{numLikes} likes</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "gainsboro",
    borderWidth: 1,
    paddingHorizontal: 15,
    shadowColor: "black",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "space-evenly",
  },
  row: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  content: {
    marginLeft: 45,
  },
  username: {
    color: "black",
    textAlign: "left",
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    width: "100%",
    marginBottom: 10,
  },
  editDelete: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  juntar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
