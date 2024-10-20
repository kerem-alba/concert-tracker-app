import { Text, View } from "react-native";
import React from "react";
import HomeScreen from "@/screens/HomeScreen";
import DetailsScreen from "@/screens/DetailsScreen";
import ArtistProfileScreen from "@/screens/ArtistProfileScreen";
import LoginScreen from "@/screens/LoginScreen";
import { RootStackParamList } from "@/types/types";
import { createStackNavigator } from "@react-navigation/stack";

const RootStack = createStackNavigator<RootStackParamList>();

export default function Index() {
  return (
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="Details" component={DetailsScreen} />
      <RootStack.Screen name="ArtistProfile" component={ArtistProfileScreen} />
      <RootStack.Screen name="Login" component={LoginScreen} />
    </RootStack.Navigator>
  );
}
