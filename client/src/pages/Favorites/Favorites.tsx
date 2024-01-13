import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { LocationInfoDto } from "../../types/weather";
import Loader from "../../components/Loader/Loader";
import ErrorLabel from "../../components/ErrorLabel/ErrorLabel";
import WeatherContext from "../../contexts/WeatherContext";
import CityList from "../../components/CityList/CityList";
import WeatherCardContainer from "../../components/WeatherCardContainer/WeatherCardContainer";

const Favorites: React.FC = () => {
  const { favorites, error, loading } = useContext(WeatherContext);
  const [selectedCity, setSelectedCity] = useState<LocationInfoDto | null>(
    null
  );

  useEffect(() => {
    if (!selectedCity && favorites.length > 0) {
      setSelectedCity(favorites[0]);
    } else if (
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
      <CityList
        favorites={favorites}
        selectedCity={selectedCity}
        onCityClick={handleCityClick}
      />
      <WeatherCardContainer selectedCity={selectedCity} />
    </div>
  );
};

export default Favorites;
