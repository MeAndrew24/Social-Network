import { Pressable, Text, StyleSheet, View } from "react-native";
import { useLogin } from "../context/LoginProvider";
import { useNavigation } from "@react-navigation/native";

export default ProfilePic = ({ userID, username, size }) => {
  const colorArray = ["#56E39F", "#3066BE", "#FF4242", "#F1A208"];
  const firstLetterAsciiValue = username.charCodeAt(0);
  const color = colorArray[firstLetterAsciiValue % 4];

  const { userSession } = useLogin();
  const navigation = useNavigation();

  const goToProfile = () => {
    if (userID === userSession.userId) navigation.navigate("Tabs", { screen: "Profile" });
    else navigation.navigate("User Profile", { userID: userID });
  };

  return (
    <Pressable onPress={goToProfile}>
      <View style={[styles.profilePic, { backgroundColor: color, width: size, height: size }]}>
        <Text style={[styles.capitalLetter, { fontSize: size / 2 }]}>{username[0].toUpperCase()}</Text>
      </View>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  profilePic: {
    borderRadius: 64,
    justifyContent: "center",
  },
  capitalLetter: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  }
});