import get_data_by_city_name from "../core/get_data_by_city_name";
import event_bind from "../utils/event_bind";
import get_element_by_id from "../utils/get_element_by_id";
import units from "../utils/units";
import load_data from "./load_data";

export default async function page_load(city_name, unit) {
  const data = await get_data_by_city_name(city_name, unit);

  // DOM Cache
  const weather_condition_field = get_element_by_id("weather-condition");
  const city_field = get_element_by_id("city");
  const country_field = get_element_by_id("country");
  const current_temp_field = get_element_by_id("current_temp");
  const feels_like_field = get_element_by_id("feels_like");
  const wind_field = get_element_by_id("wind");
  const humidity_field = get_element_by_id("humidity");

  const search_city_input = get_element_by_id("city_search");

  weather_condition_field.textContent = data.status;
  city_field.textContent = data.city.toUpperCase();
  country_field.textContent = data.country.toUpperCase();
  current_temp_field.innerHTML = `${data.current_temp}<sup><sup>0</sup>${
    unit === units.IMPERIAL.name
      ? units.IMPERIAL.temp_symbol
      : units.METRIC.temp_symbol
  }</sup>`;
  feels_like_field.innerHTML = `${data.feels_like}<sup><sup>0</sup>${
    unit === units.IMPERIAL.name
      ? units.IMPERIAL.temp_symbol
      : units.METRIC.temp_symbol
  }</sup>`;
  wind_field.textContent = `${data.wind_speed} ${
    unit === units.IMPERIAL.name
      ? units.IMPERIAL.speed_symbol
      : units.METRIC.speed_symbol
  }`;
  humidity_field.textContent = `${data.humidity}%`;

  event_bind({
    event: "keydown",
    fn: load_data,
    element: search_city_input,
  });
}
