import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import AllPosts from "./AllPosts";
import Following from "./Following";
import Profile from "./Profile";

const Tab = createBottomTabNavigator();

export default function NavTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#00171F", // Color when tab is active
        tabBarInactiveTintColor: "gray", // Color when tab is inactive
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
