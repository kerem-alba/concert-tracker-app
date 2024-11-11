import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

export default function ExploreConcertsInfoBox({ concert }: { concert: any }) {
  const { ArtistName, Venue, City, ConcertDate, ImgUrl } = concert;

  const formattedDate = new Date(ConcertDate).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      <Image source={{ uri: ImgUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.artistName}>{ArtistName}</Text>
        <Text style={styles.city}>{City}</Text>
        <Text style={styles.venue}>{Venue}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#182218",
    width: width * 0.45,
    height: 150,
    margin: 3,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: width * 0.23,
    height: 150,
    marginRight: 5,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 5,
    justifyContent: "space-between",
    color: "#white",
  },
  artistName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  venue: {
    fontSize: 10,
    color: "white",
    marginTop: 3,
  },
  city: {
    fontSize: 12,
    color: "white",
    marginTop: 3,
  },
  date: {
    fontSize: 12,
    color: "white",
    marginTop: 3,
  },
});
