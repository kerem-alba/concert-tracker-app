import { Concerts } from "../data/fakeData";
import { Artists } from "../data/fakeData";
import { Combined } from "../data/fakeData";

const getAllConcerts = () => {
  return Concerts;
};

const getConcertById = (id: string) => {
  return Combined.find((concert) => concert.artistId === id);
};

const checkIfArtistExists = (artistName: string) => {
  return Artists.some((artist) => artist.name.toLowerCase() === artistName.toLowerCase());
};

export function artistExists(artistName: string) {
  return Artists.some((artist) => artist.name.toLowerCase() === artistName.toLowerCase());
}

export function artistHasConcerts(artistId: string) {
  return Combined.some((concert) => concert.artistId === artistId);
}

export function getPopularConcerts(n: number) {
  const uniqueConcerts: any[] = [];
  const artistIds = new Set();

  Combined.forEach((concert) => {
    if (concert.popularity > 30 && !artistIds.has(concert.artistId)) {
      uniqueConcerts.push(concert);
      artistIds.add(concert.artistId);
    }
  });

  return uniqueConcerts.sort((a, b) => b.popularity - a.popularity).slice(0, n);
}

export function getUpcomingConcerts(n: number) {
  const today = new Date();
  const nDaysLater = new Date();
  nDaysLater.setDate(today.getDate() + n);
  const upcomingConcerts = Combined.filter((concert) => {
    const concertDate = new Date(concert.date);
    return concertDate >= today && concertDate <= nDaysLater;
  });
  return upcomingConcerts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 10);
}

const dbService = {
  getAllConcerts,
  getConcertById,
  getPopularConcerts,
};

export default dbService;
