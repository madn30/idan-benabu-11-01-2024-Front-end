import { Dispatch } from "react";
import { LocationInfoDto, WeatherInfoDto } from "../../types/weather";

export interface WeatherState {
  selectedLocation?: LocationInfoDto;
  weatherInfo?: WeatherInfoDto;
  favorites: LocationInfoDto[];
  loading: boolean;
  error: string | null;
}

export interface WeatherContextValue extends WeatherState {
  setSelectedLocation: Dispatch<LocationInfoDto | undefined>;
  setWeatherInfo: (location: LocationInfoDto) => Promise<void>;
  setFavorites: (favorites: LocationInfoDto[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export type Action =
  | { type: "SET_SELECTED_LOCATION"; payload: LocationInfoDto | undefined }
  | { type: "SET_WEATHER_INFO"; payload: WeatherInfoDto }
  | { type: "SET_FAVORITES"; payload: { favorites: LocationInfoDto[] } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };
