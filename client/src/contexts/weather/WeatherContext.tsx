import React, { createContext, useReducer, FC } from "react";
import { WeatherContextValue } from "./types";
import { weatherReducer, initialWeatherState } from "./reducer";
import {
  setSelectedLocationAction,
  setWeatherInfoAction,
  setFavoritesAction,
  setLoadingAction,
  setErrorAction,
} from "./actions";
import { getCurrentWeather } from "../../api";
import { LocationInfoDto } from "../../types/weather";

export const WeatherContext = createContext<WeatherContextValue>({
  ...initialWeatherState,
  setSelectedLocation: () => {},
  setWeatherInfo: async () => {},
  setFavorites: () => {},
  setLoading: () => {},
  setError: () => {},
});

export const WeatherProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(weatherReducer, initialWeatherState);

  const setSelectedLocation = (location: LocationInfoDto | undefined) => {
    dispatch(setSelectedLocationAction(location));
  };

  const setWeatherInfo = async (location: LocationInfoDto) => {
    try {
      const response = await getCurrentWeather(location.key);
      dispatch(setWeatherInfoAction(response.data));
    } catch (error: any) {
      console.error("Failed to fetch weather info:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch weather info";
      dispatch(setErrorAction(errorMessage));
    }
  };

  const setFavorites = (favorites: LocationInfoDto[]) => {
    dispatch(setFavoritesAction(favorites));
  };

  const setLoading = (isLoading: boolean) => {
    dispatch(setLoadingAction(isLoading));
  };

  const setError = (error: string | null) => {
    dispatch(setErrorAction(error));
  };

  return (
    <WeatherContext.Provider
      value={{
        ...state,
        setSelectedLocation,
        setWeatherInfo,
        setFavorites,
        setLoading,
        setError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
