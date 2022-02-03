import { getLocalStorage, setLocalStorage } from '../services/LocalStorage';

export const concatItensRecipes = (item) => {
  const i = 'strIngredient';
  const x = 'strMeasure';
  const ingredients = Object.entries(item)
    .filter((a) => a[0]
      .includes(i) && a[1] !== '' && a[1] !== null && a[1] !== ' ')
    .map((b) => b[1]);
  const valuesIngredients = Object.entries(item)
    .filter((d) => d[0]
      .includes(x) && d[1] !== ' ' && d[1] !== null && d[1] !== '')
    .map((b) => b[1]);
  const teste = [];
  ingredients.forEach((val, index) => teste
    .push(`${val} - ${valuesIngredients[index]}`));
  return teste;
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

const setObjFoods = (itens) => ({
  id: itens.idMeal,
  type: 'food',
  nationality: itens.strArea || '',
  category: itens.strCategory,
  alcoholicOrNot: '',
  name: itens.strMeal,
  image: itens.strMealThumb,
  doneDate: itens.dateModified ? itens.dateModified : '',
  tags: itens.strTags ? itens.strTags.split(',') : '',
});

const setObjDrinks = (itens) => ({
  id: itens.idDrink,
  type: 'drink',
  nationality: '',
  category: itens.strCategory,
  alcoholicOrNot: itens.strAlcoholic,
  name: itens.strDrink,
  image: itens.strDrinkThumb,
  doneDate: itens.dateModified ? itens.dateModified : '',
  tags: itens.strTags ? itens.strTags.split(',') : '',
});

export const saveStorageDone = (itens, type) => {
  let setSaveObj = [];
  if (type === 'food') {
    setSaveObj = setObjFoods(itens);
  } else {
    setSaveObj = setObjDrinks(itens);
  }
  if (getLocalStorage('doneRecipes')) {
    const getStorageItens = JSON.parse(getLocalStorage('doneRecipes'));
    getStorageItens.push(setSaveObj);
    setLocalStorage('doneRecipes', JSON.stringify(getStorageItens));
  } else {
    setLocalStorage('doneRecipes', JSON.stringify([setSaveObj]));
  }
};

export const handleFavoriteDrinks = (item) => {
  const setFavorite = setObjFavoriteDrinks(item);
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

export const checkInputFoods = (index) => {
  if (getLocalStorage('inProgressRecipes')) {
    const item = JSON.parse(getLocalStorage('inProgressRecipes'));
    const itensMeals = item.meals;
    if (!itensMeals[id]) itensMeals[id] = [];
    if (itensMeals[id].includes(index)) {
      const remove = itensMeals[id].filter((i) => i !== index);
      const newObj = { ...item, meals: { ...itensMeals, [id]: remove } };
      setLocalStorage('inProgressRecipes', JSON.stringify(newObj));
      setCheckBox(remove);
    } else {
      const ids = [...itensMeals[id], index];
      const newObjSet = { ...item, meals: { ...itensMeals, [id]: ids } };
      setLocalStorage('inProgressRecipes', JSON.stringify(newObjSet));
      setCheckBox(ids);
    }
  }
};
