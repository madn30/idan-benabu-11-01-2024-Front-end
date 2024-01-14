/* eslint-disable max-len */
import { Fragment, useContext, useEffect } from "react";
import type { FC } from "react";
import WeatherContext from "../../contexts/weather/WeatherContext";
import { getFavorites } from "../../api";

const DataFetcher: FC = () => {
  const { setFavorites, setLoading, setError } = useContext(WeatherContext);

  useEffect(() => {
    setLoading(true);
    const fetchFavorites = async () => {
      try {
        const response = await getFavorites()
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
