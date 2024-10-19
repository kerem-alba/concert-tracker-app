export const fetchUserProfile = async (accessToken: string) => {
  const userProfileResponse = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userProfile = await userProfileResponse.json();
  return userProfile;
};

export const fetchUserTopArtists = async (accessToken: string) => {
  const userTopArtistsResponse = await fetch("https://api.spotify.com/v1/me/top/artists?offset=1", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userTopArtists = await userTopArtistsResponse.json();
  return userTopArtists;
};

export const getUserTopArtistsIds = async (accessToken: string) => {
  const userTopArtists = await fetchUserTopArtists(accessToken);
  const userTopArtistsIds = userTopArtists.items.map((artist: any) => artist.id);
  return userTopArtistsIds;
};

export const fetchConcertsByArtistId = async (accessToken: string, artistId: string) => {
  console.log("fetchConcertsByArtistId -> ", artistId);
  const concertsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/concerts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const concerts = await concertsResponse.json();
  console.log("Concerts -> ", concerts);
  return concerts;
};
