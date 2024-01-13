import { useContext, useEffect, useState } from "react";
import "./styles.css";
import LocalWeatherCard from "../../components/LocalWeather/LocalWeatherCard";
import { LocationInfoDto } from "../../types/weather";
import Loader from "../../components/Loader/Loader";
import ErrorLabel from "../../components/ErrorLabel/ErrorLabel";
import WeatherContext from "../../contexts/WeatherContext";

const Favorites = () => {
  const { favorites, error, loading } = useContext(WeatherContext);
  const [selectedCity, setSelectedCity] = useState<LocationInfoDto | null>(
    null
  );

  useEffect(() => {
    if (
      selectedCity &&
      !favorites.some((fav) => fav.key === selectedCity.key)
    ) {
      setSelectedCity(favorites.length > 0 ? favorites[0] : null);
    }
  }, [favorites, selectedCity]);

  const handleCityClick = (city: LocationInfoDto) => {
    setSelectedCity(city);
  };

  if (loading) {
    return <Loader size={40} />;
  }
  if (error) {
    return <ErrorLabel msg={error} center />;
  }

  return (
    <div className="container">
      <div className="list-container">
        {favorites.length > 0 ? (
          <ul>
            {favorites.map((favorite) => (
              <li
                key={favorite.key}
                onClick={() => handleCityClick(favorite)}
                className={`${
                  selectedCity?.key === favorite.key ? "selected-city" : ""
                }`}
              >
                {favorite.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorites added yet.</p>
        )}
      </div>
      <div className="weather-card-container">
        {selectedCity && <LocalWeatherCard cityInfo={selectedCity} />}
      </div>
    </div>
  );
};

export default Favorites;
