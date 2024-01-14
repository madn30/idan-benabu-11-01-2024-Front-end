import React, { useContext, useState, useEffect } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import WeatherContext from "../../contexts/weather/WeatherContext";
import { LocationInfoDto } from "../../types/weather";
import "./styles.css";
import { addFavoriteCity, deleteFavoriteCity } from "../../api";
import ErrorLabel from "../ErrorLabel/ErrorLabel";

interface FavoriteProps {
  city: LocationInfoDto;
}

function Favorite({ city }: FavoriteProps) {
  const { favorites, setFavorites } = useContext(WeatherContext);
  const [isFavorited, setIsFavorited] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsFavorited(favorites.some((favorite) => favorite.key === city.key));
  }, [city, favorites]);

  const toggleFavorite = async (): Promise<void> => {
    setError("");

    try {
      if (isFavorited) {
        await deleteFavoriteCity(city.key);
        setFavorites(
          favorites.filter(
            (favorite: LocationInfoDto) => favorite.key !== city.key
          )
        );
      } else {
        const payload: LocationInfoDto = { key: city.key, name: city.name };
        await addFavoriteCity(payload);
        setFavorites([...favorites, payload]); // Directly passing the new array
      }
    } catch (error) {
      handleError(
        error,
        `Failed to ${isFavorited ? "remove" : "add"} favorite`
      );
    }
  };
  const handleError = (error: any, message: string): void => {
    console.error(message, error);
    setError(message);
  };
  const iconStyle = {
    color: "red",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
  };

  return (
    <div className="favorite-card-wrapper" onClick={toggleFavorite}>
      {error && <ErrorLabel msg={error} center />}
      {isFavorited ? (
        <MdFavorite style={{ ...iconStyle, transform: "scale(1.2)" }} />
      ) : (
        <MdFavoriteBorder style={iconStyle} />
      )}
    </div>
  );
}

export default Favorite;
