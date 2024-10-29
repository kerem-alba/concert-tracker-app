import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import ConcertInfoBox from "./FavConcertInfoBox";
import { getUserFavorites } from "../services/spotifyService";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Combined } from "@/data/fakeData";

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
        const favorites = await getUserFavorites(accessToken);
        console.log("favorites");
        favorites.map((favorite: any) => console.log(favorite.name));

        const matchedFavorites = favorites.filter((favorite: any) => Combined.some((concert: any) => concert.artistId === favorite.id));
        console.log("realMatched", matchedFavorites);
        if (matchedFavorites.length < 2) {
          matchedFavorites.push(Combined[10]);
          matchedFavorites.push(Combined[11]);
          matchedFavorites.push(Combined[12]);
          console.log("bathuska:", Combined[0]);
          matchedFavorites.push(Combined[0]);
        }
        console.log("fakeMatched", matchedFavorites);
        setFavoritesWithConcerts(matchedFavorites);
      }
    };
    fetchFavorites();
  }, [accessToken]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}> İlgini çekebilecek yaklaşan konserler </Text>
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
  text: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
    alignSelf: "flex-start",
    paddingLeft: 10,
  },
});
