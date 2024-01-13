import React, { createContext, useReducer } from "react";
import type { Dispatch, FC, ReactNode } from "react";
import { WeatherInfoDto, LocationInfoDto } from "../types/weather";
import axios from "axios";

interface WeatherState {
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

interface WeatherProviderProps {
  children: ReactNode;
}

type SetSelectedLocationAction = {
  type: "SET_SELECTED_LOCATION";
  payload: LocationInfoDto | undefined;
};

type SetWeatherInfoAction = {
  type: "SET_WEATHER_INFO";
  payload: WeatherInfoDto;
};

type SetFavoritesAction = {
  type: "SET_FAVORITES";
  payload: { favorites: LocationInfoDto[] };
};
type SetLoadingAction = {
  type: "SET_LOADING";
  payload: boolean;
};

type SetErrorAction = {
  type: "SET_ERROR";
  payload: string | null;
};

type Action =
  | SetSelectedLocationAction
  | SetWeatherInfoAction
  | SetFavoritesAction
  | SetLoadingAction
  | SetErrorAction;

const initialWeatherState: WeatherState = {
  selectedLocation: undefined,
  favorites: [],
  loading: false,
  error: null,
};

const reducer = (state: WeatherState, action: Action): WeatherState => {
  switch (action.type) {
    case "SET_SELECTED_LOCATION":
      return {
        ...state,
        selectedLocation: action.payload,
      };
    case "SET_WEATHER_INFO":
      return {
        ...state,
        weatherInfo: action.payload,
      };
    case "SET_FAVORITES":
      return {
        ...state,
        favorites: action.payload.favorites,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const WeatherContext = createContext<WeatherContextValue>({
  ...initialWeatherState,
  setSelectedLocation: () => {},
  setWeatherInfo: async () => {},
  setFavorites: () => {},
  setLoading: () => {},
  setError: () => {},
});

export const WeatherProvider: FC<WeatherProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialWeatherState);

  const setSelectedLocation = (location: LocationInfoDto | undefined) => {
    dispatch({ type: "SET_SELECTED_LOCATION", payload: location });
  };

  const setWeatherInfo = async (location: LocationInfoDto) => {
    try {
      const response = await axios.get<WeatherInfoDto>(
        `http://localhost:5000/weather/getWeather?cityKey=${location.key}`
      );
      dispatch({ type: "SET_WEATHER_INFO", payload: response.data });
    } catch (error) {
      console.error("Failed to fetch weather info:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to fetch weather info" });
    }
  };

  const setFavorites = (favorites: LocationInfoDto[]) => {
    dispatch({ type: "SET_FAVORITES", payload: { favorites } });
  };
  const setLoading = (isLoading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: isLoading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: "SET_ERROR", payload: error });
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
