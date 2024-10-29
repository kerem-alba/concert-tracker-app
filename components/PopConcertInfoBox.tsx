import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";

const { width } = Dimensions.get("window");

export default function PopConcertInfoBox({ concert }: { concert: any }) {
  const { artistName, venue, city, date, imageUrl1 } = concert;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl1 }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.artistName}>{artistName}</Text>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.venue}>{venue}</Text>
        <Text style={styles.date}>{date}</Text>
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
