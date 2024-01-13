import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    temperatureCelsius: { type: Number, required: true },
    weatherText: { type: String, required: true },
  },
  { timestamps: true }
);

const Weather = mongoose.model("Weather", weatherSchema);

export default Weather;
