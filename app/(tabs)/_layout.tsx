import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#002882",
        tabBarInactiveTintColor: "#C6C6C6",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          paddingBottom: 5,
          height: 70,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused? "home-sharp":"home-outline"} size={24}  color={focused ? "#002882" : "black"}/>
          ),
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused?"cart-sharp": "cart-outline"} size={24}   color={focused ? "#002882" : "black"}/>
          ),
          title: "Cart",
        }}
      />
      <Tabs.Screen
        name="Wishlist"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name={focused ? "favorite" : "favorite-outline"}
              size={24}
              color={focused ? "#002882" : "black"}
            />
          ),
          title: "WishList",
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5 name={focused? "user-alt":"user"} size={24} color={focused ? "#002882" : "black"}/>

          ),

          title: "Profile",
        }}
      />
    </Tabs>
  );
};

export default _layout;
