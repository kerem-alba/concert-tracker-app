import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/types/types";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  route: RouteProp<RootStackParamList, "ArtistDetails">;
};

export default function ArtistDetailsScreen({ route }: Props) {
  const { concert } = route.params;
  console.log("concert", concert);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Artist Details</Text>

        <Image source={{ uri: concert.ImgUrl }} style={styles.image} />

        <Text style={styles.artistName}>{concert.ArtistName}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  artistName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 10,
  },
});
