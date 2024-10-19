import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import ButtonLog from "../components/ButtonLog";
import { useLogin } from "../context/LoginProvider";
import { useNavigation } from "@react-navigation/native";

function SocialNewPost({ navigation, route }) {
  const { postId, currentText } = route.params;
  const [postText, setPostText] = useState(currentText || "");
  const [isLoading, setIsLoading] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const { userSession } = useLogin();
  const navigationRouter = useNavigation();

  const [errors, setErrors] = useState({});

  const handlePostCreation = async () => {
    let inputValidationErrors = {};

    if (!postText) {
      inputValidationErrors.postText = "Cannot submit an empty post";
    }

    setErrors(inputValidationErrors);

    if (Object.keys(inputValidationErrors).length === 0) {
      try {
        setIsLoading(true);

        const response = await fetch(
          "https://social-network-v7j7.onrender.com/api/posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userSession.token}`,
            },
            body: JSON.stringify({
              content: postText,
            }),
          }
        );

        const json = await response.json();

        if (response.ok) {
          console.log("Post creado con exito, respuesta:");
          console.log(json);
          setPostSuccess(true);
          setPostText("");
        } else {
          setErrors({ server: json.message || "Something went wrong." });
          throw new Error(errors.server);
        }
      } catch (e) {
        console.error("Error:", e.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePostEdit = async () => {
    let inputValidationErrors = {};

    if (!postText) {
      inputValidationErrors.postText = "Cannot submit an empty post";
    }

    setErrors(inputValidationErrors);

    if (Object.keys(inputValidationErrors).length === 0) {
      try {
        setIsLoading(true);

        const response = await fetch(
          `https://social-network-v7j7.onrender.com/api/posts/${postId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userSession.token}`,
            },
            body: JSON.stringify({
              content: postText,
            }),
          }
        );

        const json = await response.json();

        if (response.ok) {
          console.log("Post actualizado con exito, respuesta:");
          console.log(json);
          setPostSuccess(true);
          setPostText("");
          navigationRouter.navigate("Tabs");
        } else {
          setErrors({ server: json.message || "Something went wrong." });
          throw new Error(errors.server);
        }
      } catch (e) {
        console.error("Error:", e.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        multiline={true}
        numberOfLines={10}
        maxLength={40}
        style={styles.input}
        placeholder="Share your thoughts..."
        value={postText}
        onChangeText={setPostText}
      />
      {errors.postText && (
        <Text style={styles.errorText}>{errors.postText}</Text>
      )}

      {postSuccess ? (
        <Text style={styles.success}>
          Thought {postId === -1 ? "created" : "updated"} successfully!
        </Text>
      ) : (
        <></>
      )}

      {postId === -1 ? (
        <View style={styles.button}>
          <ButtonLog
            color={"#31D888"}
            titleB="Submit a new thought"
            onPress={handlePostCreation}
            loading={isLoading}
          />
        </View>
      ) : (
        <View style={styles.button}>
          <ButtonLog
            color={"#31D888"}
            titleB="Update your thought"
            onPress={handlePostEdit}
            loading={isLoading}
          />
        </View>
      )}
    </View>
  );
}

export default SocialNewPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  pressedItem: {
    opacity: 0.85,
  },
  goSign: {
    color: "#4ea3db",
    marginLeft: 5,
    paddingBottom: 5,
    paddingRight: 10,
  },
  join: {
    marginTop: 10,
    flexDirection: "row",
  },
  input: {
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    textAlignVertical: "top",
    width: "100%",
    borderColor: "#125352",
    padding: 8,
    marginBottom: 10,
    backgroundColor: "white",
  },
  button: {
    width: "100%",
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  success: {
    color: "lightgreen",
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 10,
  },
});
