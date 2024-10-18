import { Pressable, Text, StyleSheet, View } from "react-native";

export default ProfilePic = ({ username, size }) => {
  const colorArray = ["#56E39F", "#3066BE", "#FF4242", "#F1A208"];
  const firstLetterAsciiValue = username.charCodeAt(0);
  const color = colorArray[firstLetterAsciiValue % 4];

  return (
    <View style={[styles.profilePic, { 
      backgroundColor: color,
      width: size,
      height: size 
    }]}>
      <Text style={[styles.capitalLetter, { fontSize: size / 2 }]}>{username[0].toUpperCase()}</Text>
    </View>
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
