import { View, ScrollView, Button, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RootStackParamList } from "@/types/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import UpcomingConcertsComponent from "@/components/UpcomingConcertsCarousel";
import PopConcertGrid from "@/components/PopConcertGrid";
import FavConcertCarousel from "@/components/FavConcertCarousel";
import { SafeAreaView } from "react-native-safe-area-context";
import UserHeader from "@/components/UserHeader";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation: { navigate } }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <UserHeader />
      <ScrollView>
        <FavConcertCarousel />
        <PopConcertGrid />
        <Button title="Artist Details" onPress={() => navigate("Details")} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101510",
    paddingTop: 20,
  },
});
