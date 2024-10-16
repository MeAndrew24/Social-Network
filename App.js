import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavTab from "./src/screens/NavTab";
import Navlog from "./src/screens/Navlog";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NavTab />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
