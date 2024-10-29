export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  ArtistDetails: { concert: Concert };
  Login: undefined;
  ConcertDetails: { concert: Concert };
  PopularConcerts: undefined;
  UpcomingConcerts: undefined;
};

export interface Artist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  images: { url: string }[];
}

type Concert = {
  artistId: string;
  artistName: string;
  city: string;
  concertId: string;
  date: string;
  genres: string[];
  imageUrl1: string;
  imageUrl2: string;
  popularity: number;
  venue: string;
};
