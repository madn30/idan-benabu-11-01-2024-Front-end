import React from "react";
import Loader from "../../Loader/Loader";

interface SearchBarProps {
  query: string;
  loading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  loading,
  onInputChange,
  onKeyDown,
  onSearchClick,
}) => (
  <div className="search-bar">
    <input
      type="search"
      name="search"
      onChange={onInputChange}
      onKeyDown={onKeyDown}
      value={query}
      placeholder="Search city"
    />
    <button onClick={onSearchClick} className="search-btn" type="submit">
      {loading ? <Loader size={18} /> : <span>Search</span>}
    </button>
  </div>
);

export default SearchBar;
