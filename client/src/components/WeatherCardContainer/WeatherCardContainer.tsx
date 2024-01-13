import React, { useEffect, useState } from "react";
import { LocationInfoDto, WeatherInfoDto } from "../../types/weather";
import LocalWeatherCard from "./WeatherCard/WeatherCard";
import { getCurrentWeather } from "../../api";
import ErrorLabel from "../ErrorLabel/ErrorLabel";
import Loader from "../Loader/Loader";
interface WeatherCardContainerProps {
  selectedCity: LocationInfoDto | null;
}
const WeatherCardContainer: React.FC<WeatherCardContainerProps> = ({
  selectedCity,
}) => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfoDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedCity) {
      const fetchWeather = async () => {
        try {
          setLoading(true);
          setError("");
          const response = await getCurrentWeather(selectedCity.key);
          setWeatherInfo(response.data);
        } catch (error) {
          console.error("Failed to fetch weather info:", error);
          setError("Failed to load weather data.");
        } finally {
          setLoading(false);
        }
      };

      fetchWeather();
    }
  }, [selectedCity]);
  if (loading) return <Loader size={30} />;
  if (error) return <ErrorLabel msg={error} />;

  return (
    <div className="weather-card-container">
      {selectedCity && weatherInfo && (
        <LocalWeatherCard cityInfo={selectedCity} weatherInfo={weatherInfo} />
      )}
    </div>
  );
};

export default WeatherCardContainer;
