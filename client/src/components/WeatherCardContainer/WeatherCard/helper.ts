import CloudyAnimation from "../../../assets/weather/cloudy.json";
import SunnyAnimation from "../../../assets/weather/sunny.json";
import RainingAnimation from "../../../assets/weather/raining.json";
import StormAnimation from "../../../assets/weather/storm.json";
import FogAnimation from "../../../assets/weather/fog.json";

export const getWeatherAnimation = (weatherText: string) => {
  const normalizedText = weatherText.toLowerCase();

  if (normalizedText.includes("cloud")) {
    return CloudyAnimation;
  } else if (normalizedText.includes("sunny")) {
    return SunnyAnimation;
  } else if (normalizedText.includes("rain")) {
    return RainingAnimation;
  } else if (normalizedText.includes("storm")) {
    return StormAnimation;
  } else if (normalizedText.includes("fog")) {
    return FogAnimation;
  }

  return null;
};
