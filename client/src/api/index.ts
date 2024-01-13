import axios from "axios";
import { LocationInfoDto } from "../types/weather";

const baseURL = "http://localhost:5000/weather";

export const searchLocations = (query: string) => {
  return axios.get(`${baseURL}/search`, { params: { q: query } });
};

export const getCurrentWeather = (cityKey: string) => {
  return axios.get(`${baseURL}/getWeather?cityKey=${cityKey}`);
};

export const addFavoriteCity = (cityData: LocationInfoDto) => {
  return axios.post(`${baseURL}/favorites`, cityData);
};

export const deleteFavoriteCity = (cityKey: string) => {
  return axios.delete(`${baseURL}/favorites/${cityKey}`);
};
