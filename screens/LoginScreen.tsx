import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Button, Text, View, Alert } from "react-native";
import { fetchAccessToken } from "../services/authService";
import { fetchUserProfile, fetchUserTopArtistsFromSpotify, getUserTopArtistsIdsFromSpotify } from "../services/spotifyService";
import { SPOTIFY_CLIENT_ID } from "../constants/IDs";
import ExcelService from "../services/dbService";
import dbService from "../services/dbService";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../store/authSlice";
import ConcertInfo from "../components/ConcertInfoBox";
import ConcertCarousel from "@/components/ConcertCarousel";
import ArtistProfileBox from "@/components/ArtistProfileBox";

const client_id = SPOTIFY_CLIENT_ID;

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userTopArtists, setUserTopArtists] = useState<any[] | null>(null);
  const [userTopArtistsIds, setUserTopArtistsIds] = useState<string[] | null>(null);

  const dispatch = useDispatch();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: client_id,
      scopes: ["user-read-email", "playlist-modify-public", "user-top-read"],
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

  const concertData = dbService.getConcertById(24);
  console.log("concertData", concertData);

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

          const userProfile = await fetchUserProfile(accessToken);
          console.log("User Profile: ", userProfile);

          const userTopArtists = await fetchUserTopArtistsFromSpotify(accessToken);

          const userTopArtistsIds = await getUserTopArtistsIdsFromSpotify(accessToken);
          console.log("User Top Artists IDs: ", userTopArtistsIds);

          setUserName(userProfile.display_name);
          setUserTopArtists(userTopArtists.items);
          setUserTopArtistsIds(userTopArtistsIds);
        } catch (error) {
          Alert.alert("Error", "Failed to login with Spotify.");
        }
      };

      handleSpotifyLogin();
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {userName ? <Text>Welcome, {userName}!</Text> : <Text>Please login to Spotify</Text>}

      {/* {userTopArtists && (
        <View>
          <Text>Your top artists:</Text>
          {userTopArtists.map((artist) => (
            <Text key={artist.id}>{artist.name}</Text>
          ))}
        </View>
      )} */}

      <ConcertCarousel />

      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}
