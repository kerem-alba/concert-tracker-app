import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchUserTopArtistsFromSpotify } from "../services/spotifyService";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function FavoriteArtists() {
  const [userTopArtists, setUserTopArtists] = useState<any[] | null>(null);

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const fetchUserTopArtists = async () => {
      if (!accessToken) {
        return;
      }
      const userTopArtists = await fetchUserTopArtistsFromSpotify(accessToken);
      setUserTopArtists(userTopArtists);
    };

    fetchUserTopArtists();
  }, []);

  return (
    <View>
      <Text>FavoriteArtists</Text>
    </View>
  );
}
