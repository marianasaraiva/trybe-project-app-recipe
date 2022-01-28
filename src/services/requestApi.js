const MEALDB_API = 'https://www.themealdb.com/api/';
const COCKTAILDB_API = 'https://www.thecocktaildb.com/api/';

export const searchApi = async (search, radioSelect, typeSearch) => {
  const type = typeSearch ? COCKTAILDB_API : MEALDB_API;
  const result = {};
  if (type === 'ingredients') {
    result = await fetch(`${type}json/v1/1/filter.php?i=${search}`)
      .then((response) => response.json())
  }
};
