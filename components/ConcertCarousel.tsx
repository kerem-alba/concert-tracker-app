import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { concerts } from "@/data/fakeData";
import ConcertInfo from "./ConcertInfoBox";

const { width } = Dimensions.get("window");

const data = concerts.slice(0, 10);

const baseOptions = {
  parallaxScrollingOffset: 220,
  parallaxScrollingScale: 1,
  parallaxAdjacentItemScale: 1,
};

export default function ConcertCarousel() {
  return (
    <View style={styles.container}>
      <Carousel
        width={width * 0.95}
        height={500}
        autoPlay={true}
        data={data}
        mode="parallax"
        modeConfig={baseOptions}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => <ConcertInfo concertId={item.id} />}
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
});
