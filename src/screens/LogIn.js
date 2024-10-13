import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import ButtonLog from "../components/ButtonLog";

export default function LogIn() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput style={styles.input} placeholder="Email" />

      <TextInput style={styles.input} placeholder="Password" />
      <View style={styles.button}>
        <ButtonLog color={"blue"} titleB="Log In" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
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
