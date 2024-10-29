import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getUserFavorites } from "../services/spotifyService";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function FavoriteArtists() {
  const [userFavoriteArtists, setuserFavoriteArtists] = useState<any[] | null>(null);

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const fetchUserTopArtists = async () => {
      if (!accessToken) {
        return;
      }
      setuserFavoriteArtists(await getUserFavorites(accessToken));
    };
    fetchUserTopArtists();
  }, []);

  return (
    <View>
      <Text>FavoriteArtists</Text>
    </View>
  );
}
