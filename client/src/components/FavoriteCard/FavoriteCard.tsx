import React from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import "./styles.css";
import ErrorLabel from "../ErrorLabel/ErrorLabel";

interface FavoriteProps {
  isFavorited: boolean;
  toggleFavorite: () => Promise<void>;
  error: string;
}

const FavoriteCard = ({
  isFavorited,
  toggleFavorite,
  error,
}: FavoriteProps) => {
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
};

export default FavoriteCard;
