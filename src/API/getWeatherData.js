import api_key from "./api-key.json";

export default async function getWeatherData({ lon, lat, unit }) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key.openWeatherAPIKey}&units=${unit}`
  );

  const weatherData = await response.json();
  return weatherData;
}
