import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import ButtonLog from "../components/ButtonLog";
import { useLogin } from "../context/LoginProvider";

export default function LogIn({ navigation }) {
  const { setIsLoggedIn, setUserSession } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const handleLogIn = async () => {
    let inputValidationErrors = {};

    if (!email.includes("@")) {
      inputValidationErrors.email = "Please enter a valid email address.";
    }
    if (password.length < 1) {
      inputValidationErrors.password = "Invalid password, try again.";
    }

    setErrors(inputValidationErrors);

    if (Object.keys(inputValidationErrors).length === 0) {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://social-network-v7j7.onrender.com/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }
        );

        const json = await response.json();

        if (response.ok) {
          console.log("Login exitoso, respuesta:");

          console.log(json);
          setUserSession(json);
          setIsLoggedIn(true);
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
      <Text style={styles.title}>Welcome Back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        secureTextEntry={!showPassword}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <Pressable
        onPress={() => setShowPassword((prev) => !prev)}
        style={styles.showPassword}
      >
        <Text>{showPassword ? "Hide" : "Show"} Password</Text>
      </Pressable>

      <View style={styles.button}>
        <ButtonLog
          color={"#3066BE"}
          titleB="Log In"
          onPress={handleLogIn}
          loading={isLoading}
        />
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
    padding: 20,
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
    width: "100%",
    borderColor: "#125352",
    padding: 8,
    marginBottom: 10,
    backgroundColor: "white",
  },
  button: {
    width: "100%",
  },
  showPassword: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    alignSelf: "flex-end",
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
});
