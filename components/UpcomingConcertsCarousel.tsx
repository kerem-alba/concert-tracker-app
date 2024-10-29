import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { getUpcomingConcerts } from "@/services/dbService";
import UpcomingConcertInfoBox from "./UpcomingConcertsInfoBox";

const { width } = Dimensions.get("window");

const baseOptions = {
  parallaxScrollingOffset: 218,
  parallaxScrollingScale: 1,
  parallaxAdjacentItemScale: 1,
};

export default function UpcomingConcertCarousel() {
  const [upcomingConcerts, setupcomingConcerts] = useState<any[]>([]);

  useEffect(() => {
    const fetchUpcomingConcerts = async () => {
      const data = await getUpcomingConcerts(10);
      setupcomingConcerts(data);
    };
    fetchUpcomingConcerts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Yaklaşan konserler </Text>
      <Carousel
        width={width * 0.95}
        height={280}
        autoPlay={true}
        data={upcomingConcerts}
        mode="parallax"
        modeConfig={baseOptions}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => <UpcomingConcertInfoBox concert={item} />}
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
