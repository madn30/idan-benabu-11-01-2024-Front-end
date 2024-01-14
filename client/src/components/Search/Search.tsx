import React, { useRef, useCallback } from "react";
import SearchResults from "./SearchResults/SearchResults";
import ErrorLabel from "../ErrorLabel/ErrorLabel";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useSearchLogic } from "../../hooks/useSearchLogic";
import SearchBar from "./SearchBar/SearchBar";
import "./styles.css";

const Search: React.FC = () => {
  const {
    query,
    setQuery,
    isOpen,
    setIsOpen,
    searchResults,
    loading,
    error,
    fetchSearchResults,
    handleSelectResult,
  } = useSearchLogic();

  const searchContainerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(searchContainerRef, () => setIsOpen(false));

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value.replace(/[^A-Za-z ]/g, ""));
    },
    [setQuery]
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
        <SearchBar
          query={query}
          loading={loading}
          onInputChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onSearchClick={fetchSearchResults}
        />
        {error && <ErrorLabel msg={error} />}

        {isOpen && (
          <SearchResults
            searchResults={searchResults}
            onSelect={handleSelectResult}
          />
        )}
      </div>
    </>
  );
};

export default Search;
