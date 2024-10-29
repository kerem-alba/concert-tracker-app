import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "@/types/types";
import HomeScreen from "@/screens/HomeScreen";
import DetailsScreen from "@/screens/DetailsScreen";
import ArtistDetailsScreen from "@/screens/ArtistDetailsScreen";
import LoginScreen from "@/screens/LoginScreen";
import ConcertDetailsScreen from "@/screens/ConcertDetailsScreen";

const RootStack = createStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="Details" component={DetailsScreen} />
      <RootStack.Screen name="ArtistDetails" component={ArtistDetailsScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="ConcertDetails" component={ConcertDetailsScreen} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
}
