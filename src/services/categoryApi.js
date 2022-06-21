export const categoryApi = async (page) => {
  let url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  if (page === 'meals') url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(url);
  const data = await response.json();

  return data[page];
};

export const fetchByCategory = async (page, category) => {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  if (page === 'meals') url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(url);
  const data = await response.json();

  return data[page];
};
