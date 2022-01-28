const MEALDB_API = 'https://www.themealdb.com/api/';
const COCKTAILDB_API = 'https://www.thecocktaildb.com/api/';

export const searchApi = async (search, radioSelect, title) => {
  const setURL = (title === 'Foods') ? MEALDB_API : COCKTAILDB_API;
  const setType = (title === 'Foods') ? 'meals' : 'drinks';
  let result = [];
  if (radioSelect === 'ingredient') {
    result = await fetch(`${setURL}json/v1/1/filter.php?i=${search}`)
      .then((response) => response.json())
      .then((data) => data[setType]);
  } else if (radioSelect === 'name') {
    result = await fetch(`${setURL}json/v1/1/search.php?s=${search}`)
      .then((response) => response.json())
      .then((data) => data[setType]);
  } else {
    if (search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return result;
    }
    result = await fetch(`${setURL}json/v1/1/search.php?f=${search}`)
      .then((response) => response.json())
      .then((data) => data[setType]);
  }
  return result;
};

export const requestApiAllFoods = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => data.meals)
);

export const requestApiAllDrinks = () => (
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => data.drinks)
);
