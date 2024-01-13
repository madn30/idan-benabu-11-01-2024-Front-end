import dotenv from "dotenv";
dotenv.config();

class AccuWeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "http://dataservice.accuweather.com";
  }

  async searchLocations(query) {
    try {
      const response = await fetch(
        `${this.baseUrl}/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${query}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching location data:", error);
      throw error;
    }
  }
  async getCurrentWeather(locationKey) {
    try {
      const response = await fetch(
        `${this.baseUrl}/currentconditions/v1/${locationKey}?apikey=${this.apiKey}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching location data:", error);
      throw error;
    }
  }
}

export default new AccuWeatherService(process.env.ACCU_WEATHER_KEY);
