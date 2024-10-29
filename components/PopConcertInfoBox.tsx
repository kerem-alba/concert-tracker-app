import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";

const { width } = Dimensions.get("window");

export default function PopConcertInfoBox({ concert }: { concert: any }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: concert.imageUrl1 }} style={styles.image} />
      <Text>{concert.artistName}</Text>
      <Text>{concert.city}</Text>
      <Text>{concert.venue}</Text>
      <Text>{concert.date}</Text>
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
  image: {
    width: "100%",
    height: 150,
  },
});
