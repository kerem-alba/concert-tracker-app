import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import PopConcertInfoBox from "./PopConcertInfoBox";
import { getPopularConcerts } from "@/services/dbService";

export default function PopConcertGrid() {
  const [popularConcerts, setPopularConcerts] = useState<any | null>(null);

  useEffect(() => {
    const fetchConcerts = async () => {
      const popularConcerts = await getPopularConcerts(6);
      setPopularConcerts(popularConcerts);
    };
    fetchConcerts();
  }, []),
    console.log("popularConcerts", popularConcerts);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popüler Konserler</Text>
      <FlatList
        style={styles.flatList}
        data={popularConcerts}
        keyExtractor={(item) => item.concertId}
        numColumns={2}
        renderItem={({ item }) => <PopConcertInfoBox concert={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
    alignSelf: "flex-start",
    paddingLeft: 10,
  },
  flatList: {
    padding: 10,
  },
});
