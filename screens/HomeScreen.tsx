import { View, ScrollView, Button, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackParamList } from "@/types/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import UpcomingConcertsComponent from "@/components/UpcomingConcertsComponent";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation: { navigate } }: HomeScreenProps) {
  console.log("HomeScreen");

  return (
    <ScrollView>
      <UpcomingConcertsComponent />
      <Button title="Artist Details" onPress={() => navigate("Details")} />
      <Button title="Login" onPress={() => navigate("Login")} />
    </ScrollView>
  );
}
