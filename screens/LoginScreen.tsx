import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Button, Text, View, Alert } from "react-native";
import { fetchAccessToken } from "../services/authService";
import { fetchUserProfile, fetchUserTopArtists, fetchConcertsByArtistId, getUserTopArtistsIds } from "../services/spotifyService";
import { SPOTIFY_CLIENT_ID } from "../constants/IDs";

const client_id = SPOTIFY_CLIENT_ID;

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userTopArtists, setUserTopArtists] = useState<any[] | null>(null);
  const [userConcerts, setUserConcerts] = useState<any[] | null>(null);
  const [userTopArtistsIds, setUserTopArtistsIds] = useState<string[] | null>(null);

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

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      console.log("Authorization Code: ", code);

      const handleSpotifyLogin = async () => {
        try {
          const redirectUri = makeRedirectUri({ scheme: "exp" });

          // Access token al
          const accessToken = await fetchAccessToken(code, redirectUri);
          console.log("Access Token: ", accessToken);

          // Kullanıcı bilgilerini al
          const userProfile = await fetchUserProfile(accessToken);
          console.log("User Profile: ", userProfile);

          const userTopArtists = await fetchUserTopArtists(accessToken);

          const userTopArtistsIds = await getUserTopArtistsIds(accessToken);
          console.log("User Top Artists IDs: ", userTopArtistsIds);

          const concerts = await fetchConcertsByArtistId(accessToken, userTopArtistsIds[0]);
          console.log("Concerts: ", concerts);

          // Kullanıcı adını state'e kaydet
          setUserName(userProfile.display_name); // Kullanıcının adını alıp kaydediyoruz
          setUserTopArtists(userTopArtists.items);
          setUserTopArtistsIds(userTopArtistsIds);
          setUserConcerts(concerts);
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

      {userTopArtists && (
        <View>
          <Text>Your top artists:</Text>
          {userTopArtists.map((artist) => (
            <Text key={artist.id}>{artist.name}</Text>
          ))}
        </View>
      )}

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
