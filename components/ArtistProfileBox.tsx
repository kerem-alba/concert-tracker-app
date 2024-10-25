import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getArtistByIdFromSpotify } from "../services/spotifyService";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function ArtistProfileBox({ artistId }: { artistId: string }) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [artist, setArtist] = useState<any | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      if (!accessToken) {
        return;
      }
      const artist = await getArtistByIdFromSpotify(accessToken, artistId);
      setArtist(artist);
      console.log("Artist: ", artist);
      console.log("Artist name: ", artist.name);
      console.log("Artist genres: ", artist.genres.slice(0, 3).join(", "));
    };

    fetchArtist();
  }, []);

  return (
    <View style={styles.container}>
      {artist.images[0].url && <Image source={{ uri: artist.images[0].url }} style={styles.image} />}
      <View style={styles.infoContainer}>
        <Text style={styles.artistName}>{artist.name}</Text>
        <Text style={styles.genres}>{artist.genres.slice(0, 3).join(", ")}</Text> {/* İlk 3 türü gösteriyoruz */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  artistName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  genres: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
});
