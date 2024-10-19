import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const Stack = createNativeStackNavigator();

export default function NavLogin() {
  return (
    <Stack.Navigator initialRouteName="LogIn">
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}


