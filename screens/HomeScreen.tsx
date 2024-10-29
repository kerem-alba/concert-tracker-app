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
import { useNavigation, NavigationProp } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.container}>
      <UserHeader />
      <ScrollView>
        <FavConcertCarousel />
        <PopConcertGrid />
        <UpcomingConcertsComponent />
        <Button title="Artist Details" onPress={() => navigation.navigate("Details")} />
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
