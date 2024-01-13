import React from "react";
import { LocationInfoDto } from "../../types/weather";
import './styles.css'
interface CityListProps {
  favorites: LocationInfoDto[];
  selectedCity: LocationInfoDto | null;
  onCityClick: (city: LocationInfoDto) => void;
}

const CityList: React.FC<CityListProps> = ({
  favorites,
  selectedCity,
  onCityClick,
}) => (
  <div className="list-container">
    {favorites.length > 0 ? (
      <ul>
        {favorites.map((favorite) => (
          <li
            key={favorite.key}
            onClick={() => onCityClick(favorite)}
            className={
              selectedCity?.key === favorite.key ? "selected-city" : ""
            }
          >
            {favorite.name}
          </li>
        ))}
      </ul>
    ) : (
      <p>No favorites added yet.</p>
    )}
  </div>
);

export default CityList;
