import React, { useEffect } from "react";
import "./styles.css";
import FavoriteCard from "../FavoriteCard/FavoriteCard";
import { LocationInfoDto, WeatherInfoDto } from "../../types/weather";
import axios from "axios";
import { WiCelsius } from "react-icons/wi";
import Loader from "../Loader/Loader";
import ErrorLabel from "../ErrorLabel/ErrorLabel";
import Lottie from "lottie-react";
import { getWeatherAnimation } from "./helper";
import { getCurrentWeather } from "../../api";
interface LocalWeatherCardProps {
  cityInfo: LocationInfoDto;
}
const LocalWeatherCard: React.FC<LocalWeatherCardProps> = ({ cityInfo }) => {
  const [weatherInfo, setWeatherInfo] = React.useState<WeatherInfoDto | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { key } = cityInfo;
  const animationData = weatherInfo
    ? getWeatherAnimation(weatherInfo.weatherText)
    : null;

  useEffect(() => {
    setWeatherInfo(null);
    const fetchLatestWeather = async () => {
      setLoading(true);
      try {
        const response = await getCurrentWeather(key);
        setWeatherInfo(response.data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        console.error("Failed to fetch weather info:", error);
      }
    };
    fetchLatestWeather();
  }, [cityInfo]);
  if (loading) return <Loader size={30} />;
  if (error) return <ErrorLabel msg={error} />;

  return (
    weatherInfo && (
      <div className="local-weather-root">
        <Lottie animationData={animationData} />
        <span>{cityInfo.name}</span>
        <span>
          {weatherInfo?.temperatureCelsius}
          <WiCelsius />
        </span>
        <span>{weatherInfo?.weatherText}</span>
        <div className="favorite-container">
          <FavoriteCard city={cityInfo} />
        </div>
      </div>
    )
  );
};

export default LocalWeatherCard;
