import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types/types";
import { NavigationProp } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function SlideInMenu() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const slideAnim = useRef(new Animated.Value(-350)).current;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
    Animated.timing(slideAnim, {
      toValue: -10,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsMenuOpen(false));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openMenu}>
        <Entypo name="menu" size={36} color="#aaa" />
      </TouchableOpacity>

      <Animated.View style={[styles.sideMenu, { left: slideAnim }]}>
        <Text style={styles.menuTitle}>Menü</Text>
        <View style={styles.menuItemsContainer}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => {
              closeMenu();
              navigation.navigate("UpcomingConcerts");
            }}
          >
            <Text style={styles.menuButtonText}>UpcomingConcerts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => {
              closeMenu();
              navigation.navigate("PopularConcerts");
            }}
          >
            <Text style={styles.menuButtonText}>PopularConcerts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => {
              closeMenu();
              navigation.navigate("ExploreConcerts");
            }}
          >
            <Text style={styles.menuButtonText}>ExploreConcerts</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton} onPress={closeMenu}>
            <Text style={styles.menuButtonText}>Close Menu</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      {isMenuOpen && <Pressable style={styles.overlay} onPress={closeMenu} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  overlay: {
    position: "absolute",
    top: -15,
    bottom: 0,
    right: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: -1,
  },
  hamburger: {
    fontSize: 30,
    color: "white",
  },
  sideMenu: {
    position: "absolute",
    top: -15,
    left: 0,
    width: width * 0.55,
    backgroundColor: "white",
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    height: 40,
    textAlignVertical: "center",
    paddingLeft: 10,
  },
  menuButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "flex-start",
  },
  menuButtonText: {
    color: "black",
    fontSize: 16,
    height: 20,
  },
  menuItemsContainer: {
    height: height * 0.95,
  },
});
