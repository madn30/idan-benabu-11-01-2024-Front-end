import axios from "axios";
import { LocationInfoDto } from "../types/weather";

const baseURL = "https://real-commerce.onrender.com/weather";

export const searchLocations = (query: string) => {
  return axios.get(`${baseURL}/search`, { params: { q: query } });
};

export const getCurrentWeather = (cityKey: string) => {
  return axios.get(`${baseURL}/getWeather?cityKey=${cityKey}`);
};
export const getFavorites = () => {
  return axios.get<LocationInfoDto[]>(`${baseURL}/favorites`);
};

export const addFavoriteCity = (cityData: LocationInfoDto) => {
  return axios.post(`${baseURL}/favorite`, cityData);
};

export const deleteFavoriteCity = (cityKey: string) => {
  return axios.delete(`${baseURL}/favorite/${cityKey}`);
};
