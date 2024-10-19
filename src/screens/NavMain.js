import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import AllPosts from "./AllPosts";
import Following from "./Following";
import Profile from "./Profile";
import SocialNewPost from "./SocialNewPost";
import DeletePost from "./DeletePost";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#00171F",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="All Posts"
        component={AllPosts}
        options={{
          tabBarLabel: "All Posts",
          tabBarIcon: ({ focused, size }) => (
            <Feather
              name="home"
              size={size}
              color={focused ? "#00171F" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Following"
        component={Following}
        options={{
          tabBarLabel: "Followers",
          tabBarIcon: ({ focused, size }) => (
            <Feather
              name="users"
              size={size}
              color={focused ? "#00171F" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, size }) => (
            <Feather
              name="user"
              size={size}
              color={focused ? "#00171F" : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function NavMain() {
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Share Your Thoughts" component={SocialNewPost} />
      <Stack.Screen name="Delete Thought Confirmation" component={DeletePost} />
      <Stack.Screen name="User Profile" component={Profile} />
    </Stack.Navigator>
  );
}