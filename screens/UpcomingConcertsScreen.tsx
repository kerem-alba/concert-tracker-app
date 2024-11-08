import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { getAllArtists } from "../api/artistsApi";

export default function UpcomingConcertsScreen() {
  interface Artist {
    id: number;
    name: string;
  }

  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getAllArtists();
        setArtists(data);
      } catch (error) {
        console.error("Sanatçı verisini çekerken hata:", error);
      } finally {
        setLoading(false);
        console.log("Sanatçılar:", artists);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View>
      <FlatList
        data={artists}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
