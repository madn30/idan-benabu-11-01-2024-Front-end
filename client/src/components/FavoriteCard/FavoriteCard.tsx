import { useContext, useState, useEffect } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import WeatherContext from "../../contexts/WeatherContext";
import { LocationInfoDto } from "../../types/weather";
import "./styles.css";
import { addFavoriteCity, deleteFavoriteCity } from "../../api";

interface FavoriteProps {
  city: LocationInfoDto;
}

function Favorite({ city }: FavoriteProps) {
  const { favorites, setFavorites } = useContext(WeatherContext);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    setIsFavorited(favorites.some((favorite) => favorite.key === city.key));
  }, [city, favorites]);

  const toggleFavorite = async () => {
    if (isFavorited) {
      try {
        setFavorites(favorites.filter((favorite) => favorite.key !== city.key));
        await deleteFavoriteCity(city.key);
      } catch (error) {
        console.error("Error removing favorite:", error);
      }
    } else {
      try {
        setFavorites([...favorites, city]);
        const payload = {
          key: city.key,
          name: city.name,
        };
        await addFavoriteCity(payload);
      } catch (error) {
        console.error("Error adding favorite:", error);
      }
    }
    setIsFavorited(!isFavorited);
  };

  const iconStyle = {
    color: "red",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
  };

  return (
    <div className="favorite-card-wrapper" onClick={toggleFavorite}>
      {isFavorited ? (
        <MdFavorite style={{ ...iconStyle, transform: "scale(1.2)" }} />
      ) : (
        <MdFavoriteBorder style={iconStyle} />
      )}
    </div>
  );
}

export default Favorite;
