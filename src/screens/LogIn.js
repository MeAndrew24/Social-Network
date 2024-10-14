import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import ButtonLog from "../components/ButtonLog";

export default function LogIn({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput style={styles.input} placeholder="Email" />

      <TextInput style={styles.input} placeholder="Password" />
      <View style={styles.button}>
        <ButtonLog color={"#3066BE"} titleB="Log In" />
      </View>
      <View style={styles.join}>
        <Text>Don't have an account?</Text>
        <Pressable
          onPress={() => navigation.navigate("SignUp")}
          style={({ pressed }) => [pressed && styles.pressedItem]}
        >
          <Text style={styles.goSign}>Sign Up</Text>
        </Pressable>
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
