import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { getArtistByIdFromSpotify } from "../services/spotifyService";
import dbService from "../services/dbService";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const { width } = Dimensions.get("window");

export default function ConcertInfoBox({ concertId }: { concertId: number }) {
  const [artistId, setArtistId] = useState<string | null>(null);
  const [artistName, setArtistName] = useState<string | null>(null);
  const [venue, setVenue] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [artistImageUrl, setArtistImageUrl] = useState<string | null>(null);
  const [aboutArtist, setAboutArtist] = useState<string | null>(null);

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const concertData = dbService.getConcertById(concertId);
    if (concertData) {
      setArtistName(concertData.name);
      setVenue(concertData.venue);
      setDate(concertData.date);
      setArtistId(concertData.artistId);
      setCity(concertData.city);
    }

    const fetchArtist = async () => {
      if (accessToken && artistId) {
        const artist = await getArtistByIdFromSpotify(accessToken, artistId);
        if (artist?.images?.length > 0) {
          setArtistImageUrl(artist.images[0].url);
        }
        setAboutArtist(artist?.href);
      }
    };

    fetchArtist();
  }, [concertId, accessToken]);

  return (
    <View style={styles.box}>
      {artistImageUrl ? <Image source={{ uri: artistImageUrl }} style={styles.image} /> : <View style={styles.placeholderImage} />}
      <View style={styles.textContainer}>
        <Text style={styles.artistName}>{artistName}</Text>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.venue}>{venue}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: width * 0.4,
    height: 300,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
  },
  textContainer: {
    padding: 15,
  },
  artistName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  venue: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  placeholderImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#ccc",
  },
  city: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
});
