import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import PopConcertInfoBox from "./PopConcertInfoBox";
import { getPopularConcerts } from "@/services/dbService";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/types/types";

export default function PopConcertGrid() {
  const [popularConcerts, setPopularConcerts] = useState<any | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("ConcertDetails", { concert: item })}>
            <PopConcertInfoBox concert={item} />
          </TouchableOpacity>
        )}
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
