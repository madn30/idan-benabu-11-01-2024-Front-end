import React, { useContext, useState } from "react";
import Search from "../../components/Search/Search";
import LocalWeatherCard from "../../components/LocalWeather/LocalWeatherCard";
import "./styles.css";
import WeatherContext from "../../contexts/WeatherContext";
const Dashboard: React.FC = () => {
  const { selectedLocation } = useContext(WeatherContext);
  return (
    <>
      <Search />
      {selectedLocation && (
        <div className="dashboard-data-section">
          <LocalWeatherCard cityInfo={selectedLocation} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
