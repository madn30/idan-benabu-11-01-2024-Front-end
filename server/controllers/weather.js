import express from "express";
import AccuWeatherService from "../service/accuWeatherService.js";
import Location from "../models/Location.js";
import Weather from "../models/Weather.js";
import Favorite from "../models/Favorite.js";

const router = express.Router();

export const searchLocation = async (req, res) => {
  const query = req.query.q;

  try {
    // Check the DB location query
    const cachedLocation = await Location.findOne({ query });
    if (cachedLocation) {
      return res.status(200).json(cachedLocation.data);
    }

    // If not in database, call API
    const locations = await AccuWeatherService.searchLocations(query);
    const processedLocations = locations.map((location) => ({
      key: location.Key,
      name: location.LocalizedName,
      country: location.Country.LocalizedName,
      administrativeArea: location.AdministrativeArea.LocalizedName,
    }));

    // Save to database
    const newLocation = new Location({ query, data: processedLocations });
    await newLocation.save();
    res.status(200).json(processedLocations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCurrentWeather = async (req, res) => {
  const cityKey = req.query.cityKey;

  try {
    const cachedWeather = await Weather.findOne({ key: cityKey });
    if (cachedWeather) {
      return res.status(200).json(cachedWeather);
    }

    const apiResponse = await AccuWeatherService.getCurrentWeather(cityKey);

    if (!apiResponse || apiResponse.length === 0) {
      return res.status(404).json({ message: "Weather data not found" });
    }

    const newWeather = new Weather({
      key: cityKey,
      temperatureCelsius: apiResponse[0].Temperature.Metric.Value,
      weatherText: apiResponse[0].WeatherText,
    });
    await newWeather.save();
    res.status(200).json(newWeather);
  } catch (error) {
    console.error("Error in getCurrentWeather:", error);
    res.status(500).json({ message: error.message });
  }
};
export const getAllFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({});
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error getting favorites:", error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const addToFavorites = async (req, res) => {
  const { key, name } = req.body;
  try {
    const existingFavorite = await Favorite.findOne({ key });
    if (existingFavorite) {
      return res.status(409).json({ message: "City already in favorites" });
    }

    const newFavorite = new Favorite({ key, name });
    await newFavorite.save();

    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFavorite = async (req, res) => {
  const { key } = req.params;

  try {
    const favorite = await Favorite.findOneAndDelete({ key });
    if (!favorite) {
      return res.status(404).json({ message: "City not found in favorites" });
    }

    res.status(200).json({ message: "City removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default router;
