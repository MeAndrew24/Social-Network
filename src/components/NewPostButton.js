import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import AntDesignIcons from "react-native-vector-icons/AntDesign";

const NewPostButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed
            ? [styles.plusButton, { transform: [{ scale: 0.9 }], opacity: 0.5 }]
            : styles.plusButton
        }
      >
        <AntDesignIcons name="plus" size={36} color={"white"} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    right: 15,
    borderRadius: 50,
  },
  plusButton: {
    width: 60,
    height: 60,
    backgroundColor: "#2070af",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewPostButton;
