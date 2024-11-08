import { BASE_URL } from "../config.js";

// Tüm sanatçıları getiren fonksiyon
export const getAllArtists = async () => {
  try {
    const response = await fetch(`${BASE_URL}/artists`);
    if (!response.ok) {
      throw new Error("Sanatçıları getirirken hata oluştu");
    }
    return await response.json();
  } catch (error) {
    console.error("Hata:", error);
    throw error;
  }
};

// Belirli bir sanatçıyı spotifyId ile getiren fonksiyon
export const getArtistBySpotifyId = async (spotifyId) => {
  try {
    const response = await fetch(`${BASE_URL}/artists/${spotifyId}`);
    if (!response.ok) {
      throw new Error("Sanatçıyı getirirken hata oluştu");
    }
    return await response.json();
  } catch (error) {
    console.error("Hata:", error);
    throw error;
  }
};
