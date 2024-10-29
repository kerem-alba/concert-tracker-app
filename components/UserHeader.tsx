import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getAddressFromCoordinates } from "../services/locationService";
import * as Location from "expo-location";
import Entypo from "@expo/vector-icons/Entypo";

export default function UserHeader() {
  const userProfile = useSelector((state: RootState) => state.auth.userProfile);
  const [locationText, setLocationText] = useState<string>("Waiting for location...");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationText("İstanbul, Turkey");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});

      const address = await getAddressFromCoordinates(userLocation.coords.latitude, userLocation.coords.longitude);
      const formattedAddress = ` ${address.city || ""}, ${address.country || ""}`;
      setLocationText(formattedAddress);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Entypo name="menu" size={36} color="#aaa" />
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.location}>
          <Entypo name="location" size={16} color="#aaa" />
          <Text style={styles.locationText}>{locationText}</Text>
        </View>
        <Text style={styles.text}>{userProfile ? userProfile.display_name.split(" ")[0] : "User"}</Text>
        <Pressable>
          <Image source={{ uri: userProfile ? userProfile.images[0].url : "" }} style={styles.image} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    justifyContent: "flex-end",
  },
  menu: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#aaa",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 10,
    marginEnd: 30,
  },
  locationText: {
    fontSize: 12,
    color: "#aaa",
    paddingHorizontal: 8,
  },
});
