export default async function get_country_name(country_code) {
  try {
    const country = await fetch(
      `https://restcountries.com/v2/alpha/${country_code}`
    );

    const data = await country.json();

    return data;
  } catch (e) {
    console.log(e);
  }
}
