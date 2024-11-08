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
  ArtistName: string;
  City: string;
  Id: string;
  ConcertDate: string;
  genres: string[];
  ImgUrl: string;
  popularity: number;
  Venue: string;
};
