import React, { useState } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import ProfilePic from "../components/ProfilePic";

export default Post = ({ username, text, numLikes }) => {
  const PROFILE_PIC_POST_SIZE = 36;
  const [btnLikePressed, setBtnLikePressed] = useState(false);
  const [btnLikeColor, setBtnLikeColor] = useState("");

  const handlePressLikeBtn = () => {
    setBtnLikePressed(!btnLikePressed);
    btnLikePressed ? setBtnLikeColor("red") : setBtnLikeColor("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.row}>
        <ProfilePic username={username} size={PROFILE_PIC_POST_SIZE}/> 
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.row}>
        <Pressable onPress={handlePressLikeBtn} >
          <FontAwesomeIcon icon={faHeart} color={btnLikeColor} />
        </Pressable>
        <Text>{numLikes} likes</Text>
      </View>
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
    height: 125,
    justifyContent: "space-evenly",
  },
  row: {
    flexDirection: "row",
    columnGap: 10,
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
  }
});
