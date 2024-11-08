import { BASE_URL } from "../config.js";

export const getAllConcerts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/concerts`);
    return await response.json();
  } catch (error) {
    console.error("Konserleri getirirken hata oluştu:", error);
    throw error;
  }
};

export const getConcertsByCity = async (city) => {
  try {
    const response = await fetch(`${BASE_URL}/concerts/city?city=${city}`);
    return await response.json();
  } catch (error) {
    console.error("Şehir bazlı konserleri getirirken hata oluştu:", error);
    throw error;
  }
};

export const getConcertsByFavoriteArtists = async (favorites) => {
  const favoriteArtists = favorites.map((artist) => artist.name).join(",");
  try {
    const response = await fetch(`${BASE_URL}/concerts/favorites?favoriteArtists=${encodeURIComponent(favoriteArtists)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Favori sanatçılara göre konserleri getirirken hata oluştu");
    }

    return await response.json();
  } catch (error) {
    console.error("Hata:", error);
    throw error;
  }
};

export const getConcertsByPopularity = async (limit) => {
  try {
    const response = await fetch(`${BASE_URL}/concerts/populars?limit=${limit}`);
    return await response.json();
  } catch (error) {
    console.error("Popüler konserleri getirirken hata oluştu:", error);
    throw error;
  }
};

export const getConcertsByUpcoming = async (limit) => {
  try {
    const response = await fetch(`${BASE_URL}/concerts/upcoming?limit=${limit}`);
    return await response.json();
  } catch (error) {
    console.error("Yaklaşan konserleri getirirken hata oluştu:", error);
    throw error;
  }
};
