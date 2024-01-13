import React, { useContext, useState } from "react";
import Search from "../../components/Search/Search";
import "./styles.css";
import WeatherContext from "../../contexts/WeatherContext";
import WeatherCardContainer from "../../components/WeatherCardContainer/WeatherCardContainer";

const Dashboard: React.FC = () => {
  const { selectedLocation } = useContext(WeatherContext);
  return (
    <>
      <Search />
      {selectedLocation && (
        <div className="dashboard-data-section">
          <span><b>Recent searched</b></span>
          <WeatherCardContainer selectedCity={selectedLocation} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
