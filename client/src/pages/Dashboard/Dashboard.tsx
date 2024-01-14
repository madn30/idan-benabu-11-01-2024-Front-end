import React, { useContext } from "react";
import Search from "../../components/Search/Search";
import "./styles.css";
import WeatherContext from "../../contexts/weather/WeatherContext";
import WeatherCardContainer from "../../components/WeatherCardContainer/WeatherCardContainer";

const Dashboard: React.FC = () => {
  const { selectedLocation } = useContext(WeatherContext);
  return (
    <>
      <Search />
      {selectedLocation && (
        <div className="dashboard-data-section">
          <WeatherCardContainer selectedCity={selectedLocation} hasRecent={true}/>
        </div>
      )}
    </>
  );
};

export default Dashboard;
