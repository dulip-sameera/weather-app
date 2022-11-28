import api_key from "./api-key.json";

export default async function get_lat_and_lon_from_city_name(city_name) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city_name}&appid=${api_key.openWeatherAPIKey}`
    );

    const data = await response.json();

    return data[0];
  } catch (e) {
    console.log(e);
  }
}
