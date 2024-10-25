export const fetchUserProfile = async (accessToken: string) => {
  const userProfileResponse = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userProfile = await userProfileResponse.json();
  return userProfile;
};

export const fetchUserTopArtistsFromSpotify = async (accessToken: string) => {
  const userTopArtistsResponse = await fetch("https://api.spotify.com/v1/me/top/artists?offset=1", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userTopArtists = await userTopArtistsResponse.json();
  return userTopArtists;
};

export const getUserTopArtistsIdsFromSpotify = async (accessToken: string) => {
  const userTopArtists = await fetchUserTopArtistsFromSpotify(accessToken);
  const userTopArtistsIds = userTopArtists.items.map((artist: any) => artist.id);
  return userTopArtistsIds;
};

export const getArtistByIdFromSpotify = async (accessToken: string, artistId: string) => {
  const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const artist = await artistResponse.json();
  return artist;
};
