import api_key from "./api-key.json";

export default async function getLatAndLonFromCityName(city_name) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&appid=${api_key.openWeatherAPIKey}`
  );

  const data = await response.json();

  return data[0];
}
