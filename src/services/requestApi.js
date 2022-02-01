const MEALDB_API = 'https://www.themealdb.com/api/';
const MEALDB_FILTER = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const COCKTAILDB_API = 'https://www.thecocktaildb.com/api/';
const COCKTAILDB_FILTER = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

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
    .then((data) => data.meals.slice(0, +'12'))
);

export const requestApiAllDrinks = () => (
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => data.drinks.slice(0, +'12'))
);

export const requestApiFoodsList = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((data) => data.meals.slice(0, +'5'))
);

export const requestApiDrinksList = () => (
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((data) => data.drinks.slice(0, +'5'))
);

export const filterFoodsOrDrinks = async (filterName, type) => {
  const setUrl = (type === 'Foods') ? MEALDB_FILTER : COCKTAILDB_FILTER;
  const setType = (type === 'Foods') ? 'meals' : 'drinks';
  return fetch(`${setUrl}${filterName}`)
    .then((response) => response.json())
    .then((data) => data[setType].slice(0, +'12'));
};

export const getDetailsFoods = (id) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch(() => [])
);

export const getDetailsDrinks = (id) => (
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => data.drinks)
    .catch(() => [])
);

export const getRandomFood = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((response) => response.json())
    .then((data) => data.meals)
);

export const getRandomDrink = () => (
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((response) => response.json())
    .then((data) => data.drinks)
);

export const getAreaNationalities = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((response) => response.json())
    .then((data) => data.meals)
);

export const getFoodNationalities = (nationality) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}`)
    .then((response) => response.json())
    .then((data) => data.meals)
);

export const getIngredientsFood = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((response) => response.json())
    .then((data) => data.meals.slice(0, +'12'))
);

// export const getIngredientCardFood = (ingredient) => (
//   fetch(`https://www.themealdb.com/images/ingredients/${ingredient}.png`)
//     .then((response) => response.json())
//     .then((data) => data)
// );

export const getIngredientsDrink = () => (
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((response) => response.json())
    .then((data) => data.drinks.slice(0, +'12'))
);

// export const getIngredientCardDrink = (ingredient) => (
//   fetch(`https://www.thecocktaildb.com/images/ingredients/${ingredient}.png`)
//     .then((response) => response.json())
//     .then((data) => data)
// );
