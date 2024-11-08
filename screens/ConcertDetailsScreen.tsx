import { Text, StyleSheet, Image, ScrollView, Dimensions, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/types/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { getCoordinatesFromAddress } from "@/services/locationService";

const width = Dimensions.get("window").width;

type Props = {
  route: RouteProp<RootStackParamList, "ConcertDetails">;
};

export default function ConcertDetailsScreen({ route }: Props) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { concert } = route.params;
  console.log(concert);

  const [region, setRegion] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    const fetchCoordinates = async () => {
      const address = `${concert.City}`;
      const location = await getCoordinatesFromAddress(address);

      if (location) {
        setRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    };

    fetchCoordinates();
  }, [concert.City, concert.Venue]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Concert Details</Text>
        <Pressable onPress={() => navigation.navigate("ArtistDetails", { concert: concert })}>
          <Image source={{ uri: concert.ImgUrl }} style={styles.image} />

          <Text style={styles.artistName}>{concert.ArtistName}</Text>
        </Pressable>
        <Text style={styles.venue}>Venue: {concert.Venue}</Text>
        <Text style={styles.city}>City: {concert.City}</Text>
        <Text style={styles.date}>Date: {concert.ConcertDate}</Text>

        <Text style={styles.sectionTitle}>Location on Map:</Text>
        <MapView style={styles.map} region={region}>
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} title={concert.Venue} description={concert.City} />
        </MapView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#101510",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#aea",
    marginBottom: 15,
  },
  image: {
    width: width * 0.95,
    height: 400,
    borderRadius: 10,
    marginBottom: 15,
  },
  artistName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#aea",
    marginVertical: 10,
  },
  venue: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  city: {
    fontSize: 18,
    color: "#666",
    marginBottom: 5,
  },
  date: {
    fontSize: 18,
    color: "#666",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
    marginBottom: 5,
  },
  map: {
    width: width - 40,
    height: 300,
    borderRadius: 10,
  },
});
