import { GEOCODE_API_KEY } from "@/constants/IDs";

const API_KEY = GEOCODE_API_KEY;
const BASE_URL = "https://geocode.maps.co";

export const getCoordinatesFromAddress = async (address: string) => {
  try {
    const link = `${BASE_URL}/search?q=${encodeURIComponent(address)}&format=json&api_key=${API_KEY}`;
    const response = await fetch(link);
    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } else {
      console.error("No coordinates found for the address.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates from address:", error);
    return null;
  }
};

export const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
  try {
    const link = `${BASE_URL}/reverse?lat=${latitude}&lon=${longitude}&format=json&api_key=${API_KEY}`;
    const response = await fetch(link);
    const data = await response.json();

    if (data && data.address) {
      return data.address;
    } else {
      console.error("No address found for the coordinates.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching address from coordinates:", error);
    return null;
  }
};
