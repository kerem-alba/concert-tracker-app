import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { TouchableOpacity, Text, View, StyleSheet, Alert } from "react-native";
import { fetchAccessToken } from "../services/authService";
import { SPOTIFY_CLIENT_ID } from "../constants/IDs";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../store/authSlice";
import { setUserProfile } from "../store/authSlice";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/types/types";
import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import { getUserProfileFromSpotify } from "@/services/spotifyService";

const client_id = SPOTIFY_CLIENT_ID;

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: client_id,
      scopes: ["user-read-email", "playlist-modify-public", "user-top-read", "user-follow-read"],
      usePKCE: false,
      redirectUri: makeRedirectUri({
        scheme: "exp",
      }),
    },
    {
      authorizationEndpoint: "https://accounts.spotify.com/authorize",
      tokenEndpoint: "https://accounts.spotify.com/api/token",
    }
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      console.log("Authorization Code: ", code);

      const handleSpotifyLogin = async () => {
        try {
          const redirectUri = makeRedirectUri({ scheme: "exp" });
          const accessToken = await fetchAccessToken(code, redirectUri);
          console.log("Access Token: ", accessToken);
          dispatch(setAccessToken(accessToken));

          const userProfile = await getUserProfileFromSpotify(accessToken);
          console.log("User Profile: ", userProfile);
          dispatch(setUserProfile(userProfile));

          navigation.navigate("Home");
        } catch (error) {
          Alert.alert("Error", "Failed to login with Spotify.");
        }
      };

      handleSpotifyLogin();
    }
  }, [response]);

  return (
    <LinearGradient colors={["#1DB954", "#191414"]} style={styles.gradient}>
      <TouchableOpacity style={styles.spotifyButton} disabled={!request} onPress={() => promptAsync()}>
        <Entypo name="spotify" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Spotify ile Giriş Yap</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  loginPrompt: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 20,
  },
  spotifyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1DB954",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
