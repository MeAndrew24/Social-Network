import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";

function ButtonLog({ color, titleB, onPress, loading }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressedItem,
        { backgroundColor: color },
      ]}
      onPress={onPress}
    >
      {loading ? (
        <Text style={styles.buttonTitle}>
          <ActivityIndicator size="small" />
        </Text>
      ) : (
        <Text style={styles.buttonTitle}>{titleB}</Text>
      )}
    </Pressable>
  );
}

export default ButtonLog;

const styles = StyleSheet.create({
  buttonTitle: { textAlign: "center", color: "white" },
  pressedItem: {
    opacity: 0.85,
  },

  button: {
    padding: 10,
    borderRadius: 10,
  },
});
