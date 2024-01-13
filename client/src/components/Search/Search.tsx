import React, { useState, useRef, useContext, useCallback } from "react";
import axios from "axios";
import SearchResults from "./SearchResults/SearchResults";
import { LocationInfoDto } from "../../types/weather";
import "./styles.css";
import WeatherContext from "../../contexts/WeatherContext";
import { searchLocations } from "../../api";
import Loader from "../Loader/Loader";
import ErrorLabel from "../ErrorLabel/ErrorLabel";

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<LocationInfoDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { setSelectedLocation, setWeatherInfo } = useContext(WeatherContext);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  const handleSelectResult = useCallback(
    async (value: LocationInfoDto) => {
      setSelectedLocation(value);
      setQuery(value.name);
      setIsOpen(false);
    },
    [setSelectedLocation, setWeatherInfo]
  );

  const fetchSearchResults = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const response = await searchLocations(query);
      const results = response.data;
      setLoading(false);

      if (results.length === 1) {
        handleSelectResult(results[0]);
      } else {
        setSearchResults(results);
        setIsOpen(results.length > 0);
      }
    } catch (error) {
      console.error("Error during API call", error);
      setError("Failed to fetch results");
      setSearchResults([]);
      setIsOpen(false);
      setLoading(false);
    }
  }, [query, handleSelectResult]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className="search-container" ref={searchContainerRef}>
      <div className="search-bar">
        <input
          type="search"
          name="search"
          onChange={handleInputChange}
          value={query}
        />

        <button
          onClick={fetchSearchResults}
          className="search-btn"
          type="submit"
        >
          {loading ? <Loader size={18} /> : <span>Search</span>}
        </button>
      </div>
      {error && <ErrorLabel msg={error}/>}
      {isOpen && (
        <SearchResults
          searchResults={searchResults}
          onSelect={handleSelectResult}
        />
      )}
    </div>
  );
};

export default Search;
