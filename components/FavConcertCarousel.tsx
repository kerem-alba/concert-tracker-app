import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import ConcertInfoBox from "./FavConcertInfoBox";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchFavoriteConcerts } from "../services/concertService";

const { width } = Dimensions.get("window");

const baseOptions = {
  parallaxScrollingOffset: 218,
  parallaxScrollingScale: 1,
  parallaxAdjacentItemScale: 1,
};

export default function FavConcertCarousel() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [favoritesWithConcerts, setFavoritesWithConcerts] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (accessToken) {
        const matchedFavorites = await fetchFavoriteConcerts(accessToken);
        setFavoritesWithConcerts(matchedFavorites);
      }
    };
    fetchFavorites();
  }, [accessToken]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}> İlgini çekebilecek yaklaşan konserler </Text>
        <TouchableOpacity>
          <Text style={styles.text}> Tümünü Gör </Text>
        </TouchableOpacity>
      </View>
      <Carousel
        width={width * 0.95}
        height={280}
        autoPlay={true}
        data={favoritesWithConcerts}
        mode="parallax"
        modeConfig={baseOptions}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => <ConcertInfoBox concert={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
    alignSelf: "flex-start",
    paddingLeft: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    color: "gray",
    textAlign: "left",
    paddingLeft: 10,
  },
});
