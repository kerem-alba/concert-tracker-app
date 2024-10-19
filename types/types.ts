export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  ArtistProfile: undefined;
  Login: undefined;
};

export interface Artist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  images: { url: string }[];
}
