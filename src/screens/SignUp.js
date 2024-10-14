import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

import ButtonLog from "../components/ButtonLog";

function SignUp({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <TextInput style={styles.input} placeholder="Username" />

      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" />
      <View style={styles.button}>
        <ButtonLog color={"#12cb12"} titleB="Sign up" />
      </View>
      <View style={styles.join}>
        <Text>Already have an account?</Text>
        <Pressable
          onPress={() => navigation.navigate("LogIn")}
          style={({ pressed }) => [pressed && styles.pressedItem]}
        >
          <Text style={styles.goSign}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    paddingLeft: 10,
    borderWidth: 1.5,
    borderRadius: 5,
    width: "80%",
    borderColor: "#125352",
    padding: 3,
    marginBottom: 10,
    backgroundColor: "white",
  },
  button: {
    width: "80%",
  },
});
