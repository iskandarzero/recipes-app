export const foodApi = async (param, value) => {
  const url = `www.themealdb.com/api/json/v1/1/search.php?${param}=${value}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  return data;
};

export const drinkApi = async (param, value) => {
  const url = `www.thecocktaildb.com/api/json/v1/1/search.php?${param}=${value}`;
  const response = await fetch(url);
  const data = await response.json();

  return data.drinks;
};
