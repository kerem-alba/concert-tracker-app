import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function UserHeader() {
  const userProfile = useSelector((state: RootState) => state.auth.userProfile);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{userProfile ? userProfile.display_name.split(" ")[0] : "User"}</Text>
      <Pressable>
        <Image source={{ uri: userProfile ? userProfile.images[0].url : "" }} style={styles.image} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
});
