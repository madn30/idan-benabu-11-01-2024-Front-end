import React from "react";
import "./styles.css";
import { LocationInfoDto, WeatherInfoDto } from "../../../types/weather";
import { WiCelsius } from "react-icons/wi";
import Lottie from "lottie-react";
import { getWeatherAnimation } from "./helper";
import FavoriteIconContainer from "../../FavoriteIconContainer/FavoriteIconContainer";

interface LocalWeatherCardProps {
  weatherInfo: WeatherInfoDto;
  cityInfo: LocationInfoDto;
}

export const LocalWeatherCard: React.FC<LocalWeatherCardProps> = ({
  weatherInfo,
  cityInfo,
}) => {
  return (
    weatherInfo && (
      <div className="local-weather-root">
        <div className="favorite-container">
          <FavoriteIconContainer city={cityInfo} />
        </div>

        <Lottie className="local-weather-animation" animationData={getWeatherAnimation(weatherInfo.weatherText)} />
        <span>{cityInfo.name}</span>
        <span>
          {weatherInfo.temperatureCelsius}
          <WiCelsius />
        </span>
        <span>{weatherInfo.weatherText}</span>
      </div>
    )
  );
};



export default LocalWeatherCard;
