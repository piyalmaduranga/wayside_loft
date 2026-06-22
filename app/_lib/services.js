export async function getCountries() {
  let countries = [];
  try {
    const res = await fetch("https://flagcdn.com/en/codes.json");
    const data = await res.json();
    countries = Object.entries(data).map(([code, name]) => ({
      name,
      flag: `https://flagcdn.com/${code}.svg`,
    }));
  } catch (err) {
    console.error("Could not fetch countries:", err);
  }

  return countries;
}
