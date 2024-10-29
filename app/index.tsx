import { Text, View } from "react-native";
import React from "react";
import HomeScreen from "@/screens/HomeScreen";
import DetailsScreen from "@/screens/DetailsScreen";
import ArtistDetailsScreen from "@/screens/ArtistDetailsScreen";
import LoginScreen from "@/screens/LoginScreen";
import PopularConcertsScreen from "@/screens/PopularConcertsScreen";
import UpcomingConcertsScreen from "@/screens/UpcomingConcertsScreen";
import { RootStackParamList } from "@/types/types";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "@/store/store";
import "react-native-gesture-handler";
import ConcertDetailsScreen from "@/screens/ConcertDetailsScreen";

const RootStack = createStackNavigator<RootStackParamList>();

export default function Index() {
  return (
    <Provider store={store}>
      <RootStack.Navigator initialRouteName="Login">
        <RootStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="Details" component={DetailsScreen} />
        <RootStack.Screen name="ArtistDetails" component={ArtistDetailsScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="ConcertDetails" component={ConcertDetailsScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="PopularConcerts" component={PopularConcertsScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="UpcomingConcerts" component={UpcomingConcertsScreen} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </Provider>
  );
}
