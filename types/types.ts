export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  ArtistDetails: { concert: Concert };
  Login: undefined;
  ConcertDetails: { concert: Concert };
  PopularConcerts: undefined;
  UpcomingConcerts: undefined;
  ExploreConcerts: undefined;
};

export interface Artist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  images: { url: string }[];
}

export type Concert = {
  ArtistName: string;
  City: string;
  Id: string;
  ConcertDate: string;
  genres: string[];
  ImgUrl: string;
  popularity: number;
  Venue: string;
};

export type ConcertWithDetails = {
  ArtistName: string;
  City: string;
  ConcertDate: string;
  ConcertUrl: string;
  Id: number;
  ImgUrl: string;
  Venue: string;
  genre1: string | null;
  genre2: string | null;
  genre3: string | null;
  imageUrl: string;
  name: string;
  popularity: number;
  spotifyId: string;
};
