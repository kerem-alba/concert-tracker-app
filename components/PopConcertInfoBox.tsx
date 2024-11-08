import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

export default function PopConcertInfoBox({ concert }: { concert: any }) {
  const { ArtistName, Venue, City, ConcertDate, ImgUrl } = concert;

  return (
    <View style={styles.container}>
      <Image source={{ uri: ImgUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.artistName}>{ArtistName}</Text>
        <Text style={styles.city}>{City}</Text>
        <Text style={styles.venue}>{Venue}</Text>
        <Text style={styles.date}>{ConcertDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    width: width * 0.45,
    borderWidth: 1,
    borderColor: "red",
  },
  textContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 150,
  },
  artistName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  venue: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  placeholderImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#ccc",
  },
  city: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
});
