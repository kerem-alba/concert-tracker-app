import { getUserFavorites } from "./spotifyService";
import { getConcertsByFavoriteArtists } from "../api/concertsApi";
import { getRelatedArtistNames } from "./spotifyService";
import { ConcertWithDetails } from "../types/types";
import { genreMappings } from "../constants/genres";
import { startOfToday, endOfToday, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

export const fetchFavoriteConcerts = async (accessToken: string) => {
  const favorites = await getUserFavorites(accessToken);
  const matchedConcerts = await getConcertsByFavoriteArtists(favorites);

  //const relatedArtistConcerts = await getRelatedArtistNames(favorites, accessToken);

  return matchedConcerts;
};

export const filterConcerts = (
  concerts: ConcertWithDetails[],
  cities: string[],
  genres: string[],
  selectedDate: string,
  selectedCustomDate: Date | null
) => {
  const allGenres =
    genres.includes("Tüm") || genres.length === 0
      ? []
      : genres.flatMap((genre) => genreMappings[genre] || [genre]).filter((genre) => typeof genre === "string");

  const filteredConcerts = concerts.filter((concert) => {
    const cityMatch =
      cities.includes("Tüm") ||
      cities.some((city) => {
        if (city === "İstanbul") {
          return concert.City.toLowerCase() === "istanbul avrupa" || concert.City.toLowerCase() === "istanbul anadolu";
        }
        return concert.City.toLowerCase() === city.toLowerCase();
      });

    const genreMatch =
      allGenres.length === 0 ||
      allGenres.some((genre) =>
        [concert.genre1, concert.genre2, concert.genre3].some((g) => g && typeof g === "string" && g.toLowerCase().includes(genre.toLowerCase()))
      );

    const concertDate = new Date(concert.ConcertDate);
    let dateMatch = true;

    if (selectedDate === "Bugün") {
      dateMatch = isWithinInterval(concertDate, { start: startOfToday(), end: endOfToday() });
    } else if (selectedDate === "Bu Hafta") {
      dateMatch = isWithinInterval(concertDate, { start: startOfWeek(new Date()), end: endOfWeek(new Date()) });
    } else if (selectedDate === "Bu Ay") {
      dateMatch = isWithinInterval(concertDate, { start: startOfMonth(new Date()), end: endOfMonth(new Date()) });
    } else if (selectedDate === "Tarih Seç" && selectedCustomDate) {
      dateMatch = concertDate.toDateString() === selectedCustomDate.toDateString();
    }

    return cityMatch && genreMatch && dateMatch;
  });

  return filteredConcerts.sort((a, b) => new Date(a.ConcertDate).getTime() - new Date(b.ConcertDate).getTime());
};
