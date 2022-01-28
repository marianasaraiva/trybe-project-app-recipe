const MEALDB_API = 'https://www.themealdb.com/api/';
const COCKTAILDB_API = 'https://www.thecocktaildb.com/api/';

const searchApi = async (search, radioSelect, title) => {
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
  // console.log(result);
  return result;
};

export default searchApi;
