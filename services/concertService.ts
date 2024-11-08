import { getUserFavorites } from "./spotifyService";
import { getConcertsByFavoriteArtists } from "../api/concertsApi";

export const fetchFavoriteConcerts = async (accessToken: string) => {
  const favorites = await getUserFavorites(accessToken);
  const matchedConcerts = await getConcertsByFavoriteArtists(favorites);
  return matchedConcerts;
};
