import { Pressable, Text, StyleSheet, View } from "react-native";

function ButtonLog(props) {
  const color = props.color;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressedItem,
        { backgroundColor: color },
      ]}
    >
      <Text style={styles.buttonTitle}>{props.titleB}</Text>
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
