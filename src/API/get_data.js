import api_key from "./api-key.json";

export default async function get_data({ lon, lat, unit }) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key.openWeatherAPIKey}&units=${unit}`
    );

    const weather_data = await response.json();
    return weather_data;
  } catch (e) {
    console.log(e);
  }
}
