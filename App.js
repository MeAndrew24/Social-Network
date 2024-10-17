import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import MainNavigator from "./src/screens/MainNavigator";
import LoginProvider from "./src/context/LoginProvider";

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </LoginProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
