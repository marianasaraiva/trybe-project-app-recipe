import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Context from './Context';
import {
  filterFoodsOrDrinks,
  requestApiAllDrinks,
  requestApiAllFoods,
  searchApi,
} from '../services/requestApi';

const Provider = ({ children }) => {
  const [drinksOrFood, setDrinksOrFood] = useState([]);
  const [selectButton, setSelectButton] = useState('');
  const [globalValue, setGlobalValue] = useState(undefined);
  const history = useHistory();

  const fetchApiFoodOrDrink = async (search, type, title) => {
    const returnApi = await searchApi(search, type, title);
    const handleTitle = (title === 'Foods') ? 'idMeal' : 'idDrink';

    if (returnApi === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (returnApi.length === 1) {
      history.push(`/${title.toLowerCase()}/${returnApi[0][handleTitle]}`);
    }

    setDrinksOrFood(returnApi);
  };

  const handleClickAllFilterFoods = async (item) => {
    if (item === 'Foods') {
      const returnApiFoods = await requestApiAllFoods();
      setDrinksOrFood(returnApiFoods);
    } else {
      const returnApiDrinks = await requestApiAllDrinks();
      setDrinksOrFood(returnApiDrinks);
    }
  };

  const handleClickFilter = async (item, page) => {
    setSelectButton(item);
    if (item !== selectButton) {
      const returnFilterDrinksOrFoods = await filterFoodsOrDrinks(item, page);
      setDrinksOrFood(returnFilterDrinksOrFoods);
    }
    if (page === 'Foods' && item === selectButton) {
      const returnAllFoods = await requestApiAllFoods();
      setDrinksOrFood(returnAllFoods);
    }
    if (page === 'Drinks' && item === selectButton) {
      const returnAllDrinks = await requestApiAllDrinks();
      setDrinksOrFood(returnAllDrinks);
    }
  };

  const context = {
    drinksOrFood,
    handleClickFilter,
    setDrinksOrFood,
    fetchApiFoodOrDrink,
    handleClickAllFilterFoods,
    globalValue,
    setGlobalValue,
  };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
