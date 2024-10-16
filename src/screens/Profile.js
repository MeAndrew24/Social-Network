import { View, Text, StyleSheet } from "react-native";

function Profile(props) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.arriba}>
        <View style={[styles.profilePic, { backgroundColor: "black" }]}>
          <Text style={styles.capitalLetter}>S</Text>
        </View>

        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            width: "52%",
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text>Followers: </Text>
            <Text>1 </Text>
            {/* Display the number of followers with props in future */}
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text>Following: </Text>
            <Text>1</Text>
            {/* Display the number of following users with props in future */}
          </View>
        </View>
      </View>
      <View style={styles.abajo}>
        <Text style={styles.subtitle}>Posts</Text>
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  arriba: {
    backgroundColor: "#fbfbfb",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    borderRadius: 64,
    justifyContent: "center",
    height: 64,
    width: 64,
  },
  subtitle: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "400",
  },
  abajo: {
    width: "100%",
    flex: 3.5,
  },
  capitalLetter: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
});
