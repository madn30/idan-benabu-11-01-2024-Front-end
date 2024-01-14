import { LocationInfoDto, WeatherInfoDto } from "../../types/weather";

export const setSelectedLocationAction = (
  location: LocationInfoDto | undefined
) => ({
  type: "SET_SELECTED_LOCATION" as const,
  payload: location,
});

export const setWeatherInfoAction = (weatherInfo: WeatherInfoDto) => ({
  type: "SET_WEATHER_INFO" as const,
  payload: weatherInfo,
});

export const setFavoritesAction = (favorites: LocationInfoDto[]) => ({
  type: "SET_FAVORITES" as const,
  payload: { favorites },
});

export const setLoadingAction = (loading: boolean) => ({
  type: "SET_LOADING" as const,
  payload: loading,
});

export const setErrorAction = (error: string | null) => ({
  type: "SET_ERROR" as const,
  payload: error,
});
