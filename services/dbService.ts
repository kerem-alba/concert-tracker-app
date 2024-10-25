import { concerts } from "../data/fakeData";

const getConcertsByArtistId = (artistId: string) => {
  return concerts.filter((concert) => concert.artistId === artistId);
};

const getAllConcerts = () => {
  return concerts;
};

const getConcertById = (concertId: number) => {
  return concerts.find((concert) => concert.id === concertId);
};

const dbService = {
  getConcertById,
  getAllConcerts,
  getConcertsByArtistId,
};

export default dbService;
