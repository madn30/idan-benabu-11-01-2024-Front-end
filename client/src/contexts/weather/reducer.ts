import { WeatherState, Action } from "./types";

export const initialWeatherState: WeatherState = {
  selectedLocation: undefined,
  favorites: [],
  loading: false,
  error: null,
};

export const weatherReducer = (
  state: WeatherState,
  action: Action
): WeatherState => {
  switch (action.type) {
    case "SET_SELECTED_LOCATION":
      return { ...state, selectedLocation: action.payload };
    case "SET_WEATHER_INFO":
      return { ...state, weatherInfo: action.payload };
    case "SET_FAVORITES":
      return { ...state, favorites: action.payload.favorites };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
