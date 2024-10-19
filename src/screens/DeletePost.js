import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import ButtonLog from "../components/ButtonLog";
import { useLogin } from "../context/LoginProvider";
import { useNavigation } from "@react-navigation/native";

function DeletePost({ navigation, route }) {
  const { postId } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const { userSession } = useLogin();
  const navigationRouter = useNavigation();

  const [errors, setErrors] = useState({});

  const handlePostDeletion = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `https://social-network-v7j7.onrender.com/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userSession.token}`,
          },
          body: JSON.stringify({}),
        }
      );

      const json = await response.json();

      if (response.ok) {
        console.log("Post eliminado con exito, respuesta:");
        console.log(json);
        setPostSuccess(true);
        navigationRouter.navigate("Tabs");
      } else {
        setErrors({ server: json.message || "Something went wrong." });
        navigationRouter.navigate("Tabs");
        throw new Error("No existe. Refresca su pantalla");
      }
    } catch (e) {
      console.error("Error:", e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>
        If you eliminate your thoughts, what will be left of you?
      </Text>

      <Text style={styles.errorText}>Are you sure? </Text>

      {postSuccess ? (
        <Text style={styles.success}>Post deleted successfully!</Text>
      ) : (
        <></>
      )}

      <View style={styles.deleteMenu}>
        <View style={{ marginBottom: 20 }}>
          <ButtonLog
            color={"red"}
            titleB="Confirm deletion"
            onPress={handlePostDeletion}
            loading={isLoading}
          />
        </View>
        <View>
          <ButtonLog
            color={"grey"}
            titleB="Cancel"
            onPress={() => {
              navigationRouter.navigate("Tabs");
            }}
            loading={isLoading}
          />
        </View>
      </View>
    </View>
  );
}

export default DeletePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
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
  errorText: {
    color: "red",
    alignSelf: "center",
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  success: {
    color: "lightgreen",
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  deleteMenu: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingTop: 10,
    margin: 10,
  },
});
