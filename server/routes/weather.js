import express from "express";
import {
  searchLocation,
  getCurrentWeather,
  addToFavorites,
  deleteFavorite,
  getAllFavorites,
} from "../controllers/weather.js";

const router = express.Router();

router.get("/search", searchLocation);
router.get("/getWeather", getCurrentWeather);

router
  .route("/favorites")
  .get(getAllFavorites) 
  .post(addToFavorites);

router.delete("/favorites/:key", deleteFavorite);

export default router;
