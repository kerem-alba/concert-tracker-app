// services/authService.ts
import { Buffer } from "buffer";
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "../constants/IDs";

export const fetchAccessToken = async (code: string, redirectUri: string) => {
  const credentials = `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`;
  const encodedCredentials = Buffer.from(credentials).toString("base64");

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encodedCredentials}`,
    },
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
  });

  const tokenData = await tokenResponse.json();

  return tokenData.access_token;
};
