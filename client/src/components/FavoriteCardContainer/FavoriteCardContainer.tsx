import React, { useContext, useState, useEffect } from "react";
import WeatherContext from "../../contexts/weather/WeatherContext";
import { LocationInfoDto } from "../../types/weather";
import { addFavoriteCity, deleteFavoriteCity } from "../../api";
import FavoriteCard from "../FavoriteCard/FavoriteCard";

function FavoriteCardContainer({ city }: { city: LocationInfoDto }) {
  const { favorites, setFavorites } = useContext(WeatherContext);
  const [isFavorited, setIsFavorited] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsFavorited(favorites.some(favorite => favorite.key === city.key));
  }, [city, favorites]);

  const toggleFavorite = async (): Promise<void> => {
    setError("");
    try {
      if (isFavorited) {
        await deleteFavoriteCity(city.key);
        setFavorites(favorites.filter(favorite => favorite.key !== city.key));
      } else {
        const payload: LocationInfoDto = { key: city.key, name: city.name };
        await addFavoriteCity(payload);
        setFavorites([...favorites, payload]);
      }
    } catch (error: any) {
      handleError(error, `Failed to ${isFavorited ? "remove" : "add"} favorite`);
    }
  };

  const handleError = (error: any, message: string): void => {
    console.error(message, error);
    setError(message);
  };

  return <FavoriteCard isFavorited={isFavorited} toggleFavorite={toggleFavorite} error={error} />;
}

export default FavoriteCardContainer;
