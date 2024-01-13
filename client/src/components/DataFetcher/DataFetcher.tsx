/* eslint-disable max-len */
import axios from "axios";
import { Fragment, useContext, useEffect } from "react";
import type { FC } from "react";
import { LocationInfoDto } from "../../types/weather";
import WeatherContext from "../../contexts/WeatherContext";

const DataFetcher: FC = () => {
  const { setFavorites, setLoading, setError } = useContext(WeatherContext);

  useEffect(() => {
    setLoading(true);
    const fetchFavorites = async () => {
      try {
        const response = await axios.get<LocationInfoDto[]>(
          "http://localhost:5000/weather/favorites"
        );
        setFavorites(response.data);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("Failed to fetch favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return <Fragment />;
};

export default DataFetcher;
