export const foodApi = async (param, value) => {
  console.log(param, value);
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?${param}=${value}`;
  if (param === 'i') url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  return data.meals;
};

export const drinkApi = async (param, value) => {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${param}=${value}`;
  if (param === 'i') url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.drinks;
};
