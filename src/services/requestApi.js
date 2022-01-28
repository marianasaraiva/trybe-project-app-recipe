const MEALDB_API = 'https://www.themealdb.com/api/';
// const COCKTAILDB_API = 'https://www.thecocktaildb.com/api/';

const searchApi = async (search, radioSelect) => {
  let result = {};
  if (radioSelect === 'ingredient') {
    result = await fetch(`${MEALDB_API}json/v1/1/filter.php?i=${search}`)
      .then((response) => response.json());
  } else if (radioSelect === 'name') {
    result = await fetch(`${MEALDB_API}json/v1/1/search.php?s=${search}`)
      .then((response) => response.json());
  } else {
    if (search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    result = await fetch(`${MEALDB_API}json/v1/1/search.php?f=${search}`)
      .then((response) => response.json());
  }
  return result;
};

export default searchApi;
