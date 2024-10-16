import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import ButtonLog from "../components/ButtonLog";

function SignUp({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accountSuccess, setAccountSuccess] = useState(false);

  const [errors, setErrors] = useState({});

  const handleSignUp = async () => {
    let inputValidationErrors = {};

    if (!username) {
      inputValidationErrors.username = "Please enter a valid username.";
    }

    if (!email.includes("@")) {
      inputValidationErrors.email = "Please enter a valid email address.";
    }
    if (password.length < 1) {
      inputValidationErrors.password =
        "Password must be at least 8 character long, include numbers, symbols, uppercase and lowecase letters.";
    }
    if (password !== confirmPassword) {
      inputValidationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(inputValidationErrors);

    if (Object.keys(inputValidationErrors).length === 0) {
      try {
        setIsLoading(true);

        const response = await fetch(
          "https://social-network-v7j7.onrender.com/api/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
            }),
          }
        );

        const json = await response.json();

        if (response.ok) {
          console.log("Creacion de usuario exitosa, respuesta:");
          console.log(json.token);
          setAccountSuccess(true);
          navigation.navigate("LogIn");
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
      <Text style={styles.title}>Create an account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      {errors.username && (
        <Text style={styles.errorText}>{errors.username}</Text>
      )}

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

      <TextInput
        style={styles.input}
        secureTextEntry={!showPassword}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      )}

      <Pressable
        onPress={() => setShowPassword((prev) => !prev)}
        style={styles.showPassword}
      >
        <Text>{showPassword ? "Hide" : "Show"} Password</Text>
      </Pressable>

      {accountSuccess ? (
        <Text style={styles.success}>Signup successful! Please login.</Text>
      ) : (
        <></>
      )}

      <View style={styles.button}>
        <ButtonLog
          color={"#31D888"}
          titleB="Sign up"
          onPress={handleSignUp}
          loading={isLoading}
        />
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
  success: {
    color: "lightgreen",
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 10,
  },
});
