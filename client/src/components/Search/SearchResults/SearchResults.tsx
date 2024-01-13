import React from "react";
import "./styles.css";
import { LocationInfoDto } from "../../../types/weather";

interface SearchResultsProps {
  searchResults: LocationInfoDto[];
  onSelect: (value: LocationInfoDto) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  onSelect,
}) => {
  if (searchResults.length === 0) {
    return null;
  }

  return (
    <ul className="search-results">
      {searchResults.map((result) => (
        <li
          key={result.key}
          className="search-result-item"
          onClick={() => onSelect(result)}
        >
          {result.name}
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
