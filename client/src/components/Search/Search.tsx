import React, {
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect,
} from "react";
import SearchResults from "./SearchResults/SearchResults";
import { LocationInfoDto } from "../../types/weather";
import "./styles.css";
import WeatherContext from "../../contexts/weather/WeatherContext";
import { searchLocations } from "../../api";
import Loader from "../Loader/Loader";
import ErrorLabel from "../ErrorLabel/ErrorLabel";
import useOutsideClick from "../../hooks/useOutsideClick";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<LocationInfoDto[]>([]);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(searchContainerRef, () => setIsOpen(false));

  const { setSelectedLocation } = useContext(WeatherContext);

  const handleSelectResult = useCallback(
    (value: LocationInfoDto) => {
      setSelectedLocation(value);
      setQuery(value.name);
      setIsOpen(false);
    },
    [setSelectedLocation]
  );

  const fetchSearchResults = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    setSearchAttempted(true);
    try {
      const response = await searchLocations(query);
      const results = response.data;

      if (results.length === 0) {
        setQuery("");
      }

      setSearchResults(results);
      setIsOpen(results.length > 0);
    } catch (error) {
      console.error("Error during API call", error);
      setError("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  }, [query]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value.replace(/[^A-Za-z ]/g, ""));
    },
    []
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") fetchSearchResults();
    },
    [fetchSearchResults]
  );

  return (
    <>
      <div className="search-container" ref={searchContainerRef}>
        <div className="search-bar">
          <input
            type="search"
            name="search"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={query}
            placeholder="Search city"
          />
          <button
            onClick={fetchSearchResults}
            className="search-btn"
            type="submit"
          >
            {loading ? <Loader size={18} /> : <span>Search</span>}
          </button>
        </div>
        {error && <ErrorLabel msg={error} />}
        {isOpen && searchResults.length > 0 && (
          <SearchResults
            searchResults={searchResults}
            onSelect={handleSelectResult}
          />
        )}
      </div>
      {!loading && searchResults.length === 0 && searchAttempted && !error && (
        <div className="no-results">No results found.</div>
      )}
    </>
  );
};

export default Search;
