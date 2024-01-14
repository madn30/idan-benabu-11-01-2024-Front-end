import { useContext, useState, useEffect } from "react";
import WeatherContext from "../../contexts/weather/WeatherContext";
import { LocationInfoDto } from "../../types/weather";
import { addFavoriteCity, deleteFavoriteCity } from "../../api";
import FavoriteIcon from "./FavoriteIcon/FavoriteIcon";

function FavoriteIconContainer({ city }: { city: LocationInfoDto }) {
  const { favorites, setFavorites } = useContext(WeatherContext);
  const [isFavorited, setIsFavorited] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsFavorited(favorites.some(favorite => favorite.key === city.key));
  }, [city, favorites]);

  const toggleFavorite = async (): Promise<void> => {
    const newFavorites = isFavorited
      ? favorites.filter(favorite => favorite.key !== city.key)
      : [...favorites, { key: city.key, name: city.name }];

    setFavorites(newFavorites);
    setIsFavorited(!isFavorited);
    setError("");

    try {
      if (isFavorited) {
        await deleteFavoriteCity(city.key);
      } else {
        const payload: LocationInfoDto = { key: city.key, name: city.name };
        await addFavoriteCity(payload);
      }
    } catch (error: any) {
      setFavorites(favorites);
      setIsFavorited(favorites.some(favorite => favorite.key === city.key));
      handleError(error, `Failed to ${isFavorited ? "remove" : "add"} favorite`);
    }
  };

  const handleError = (error: any, message: string): void => {
    console.error(message, error);
    setError(message);
  };

  return <FavoriteIcon isFavorited={isFavorited} toggleFavorite={toggleFavorite} error={error} />;
}

export default FavoriteIconContainer;
