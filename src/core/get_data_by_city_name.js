import get_lat_and_lon_from_city_name from "../API/get_lat_and_lon_from_city_name";
import get_data from "../API/get_data";
import get_country_name from "../API/get_country_name";

export default async function get_data_by_city_name(city_name, unit) {
  try {
    const city = await get_lat_and_lon_from_city_name(city_name);
    const response = await get_data({
      lon: city.lon,
      lat: city.lat,
      unit: unit,
    });

    let country;
    if (response.sys.country === "GB") country = { name: "United Kingdom" };
    else {
      country = await get_country_name(response.sys.country);
    }

    const data = {
      current_temp: response.main.temp,
      feels_like: response.main.feels_like,
      humidity: response.main.humidity,
      wind_speed: response.wind.speed,
      status: response.weather[0].main,
      city: response.name,
      country: country.name,
    };
    return data;
  } catch (e) {
    console.log(e);
  }
}
