import { WeatherProvider } from "./contexts/weather/WeatherContext";
import { BrowserRouter as Router } from "react-router-dom";
import { createRouting } from "./routes";
import DataFetcher from "./components/DataFetcher/DataFetcher";

function App() {
  return (
    <Router basename="/">
      <WeatherProvider>
        <DataFetcher />
        {createRouting()}
      </WeatherProvider>
    </Router>
  );
}

export default App;
