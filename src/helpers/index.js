import { getLocalStorage, setLocalStorage } from '../services/LocalStorage';

export const concatItensRecipes = (item, typeFilter, typeFilter2) => {
  const ingredients = Object.entries(item)
    .filter((a) => a[0]
      .includes(typeFilter) && a[1] !== '' && a[1] !== null)
    .map((b) => b[1]);
  const valuesIngredients = Object.entries(item)
    .filter((d) => d[0]
      .includes(typeFilter2) && d[1] !== ' ' && d[1] !== null)
    .map((b) => b[1]);
  return ingredients.concat(valuesIngredients);
};

const setObjFavoriteFoods = (detailsItem) => ({
  id: detailsItem.idMeal,
  type: 'food',
  nationality: detailsItem.strArea,
  category: detailsItem.strCategory,
  alcoholicOrNot: '',
  name: detailsItem.strMeal,
  image: detailsItem.strMealThumb,
});

export const setObjFavoriteDrinks = (detailsItem) => ({
  id: detailsItem.idDrink,
  type: 'drink',
  nationality: '',
  category: detailsItem.strCategory,
  alcoholicOrNot: detailsItem.strAlcoholic || '',
  name: detailsItem.strDrink,
  image: detailsItem.strDrinkThumb,
});

export const handleFavoriteDrinks = (item) => {
  const setFavorite = setObjFavoriteDrinks(item);
  console.log(setFavorite);
  if (getLocalStorage('favoriteRecipes')) {
    const getStorage = JSON.parse(getLocalStorage('favoriteRecipes'));
    getStorage.push(setFavorite);
    setLocalStorage('favoriteRecipes', JSON.stringify(getStorage));
  } else {
    setLocalStorage('favoriteRecipes', JSON.stringify([setFavorite]));
  }
};

export const handleFavorite = (item) => {
  const setFavorite = setObjFavoriteFoods(item);
  if (getLocalStorage('favoriteRecipes')) {
    const getStorage = JSON.parse(getLocalStorage('favoriteRecipes'));
    getStorage.push(setFavorite);
    setLocalStorage('favoriteRecipes', JSON.stringify(getStorage));
  } else {
    setLocalStorage('favoriteRecipes', JSON.stringify([setFavorite]));
  }
};

export const removeFavorite = (idPage) => {
  const getFavorites = JSON.parse(getLocalStorage('favoriteRecipes'));
  const filter = getFavorites.filter(({ id }) => id !== idPage);
  setLocalStorage('favoriteRecipes', JSON.stringify(filter));
};
