import { useState, useCallback, useContext } from "react";
import { searchLocations } from "../api";
import { WeatherContext } from "../contexts/weather";
import { LocationInfoDto } from "../types/weather";
export const useSearchLogic = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<LocationInfoDto[]>([]);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      if (results.length === 1) {
        handleSelectResult(results[0]);
      } else if (results.length > 1) {
        setSearchResults(results);
        setIsOpen(true);
      } else {
        setError("No locations found for your search.");
        setSearchResults([]);
        setIsOpen(false);
      }
    } catch (error:any) {
      console.error("Error during API call", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [query, handleSelectResult]);

  return {
    query,
    setQuery,
    isOpen,
    setIsOpen,
    searchResults,
    setSearchResults,
    searchAttempted,
    setSearchAttempted,
    loading,
    setLoading,
    error,
    setError,
    fetchSearchResults,
    handleSelectResult,
  };
};
