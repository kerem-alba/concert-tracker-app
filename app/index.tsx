import { Text, View } from "react-native";
import React from "react";
import HomeScreen from "@/screens/HomeScreen";
import DetailsScreen from "@/screens/DetailsScreen";
import ArtistProfileScreen from "@/screens/ArtistProfileScreen";
import LoginScreen from "@/screens/LoginScreen";
import { RootStackParamList } from "@/types/types";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "@/store/store";
import "react-native-gesture-handler";

const RootStack = createStackNavigator<RootStackParamList>();

export default function Index() {
  return (
    <Provider store={store}>
      <RootStack.Navigator initialRouteName="Login">
        <RootStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="Details" component={DetailsScreen} />
        <RootStack.Screen name="ArtistProfile" component={ArtistProfileScreen} />
        <RootStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </Provider>
  );
}
