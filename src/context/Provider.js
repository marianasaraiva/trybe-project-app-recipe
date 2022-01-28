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
  const history = useHistory();

  const fetchApiFoodOrDrink = async (search, type, title) => {
    const returnApi = await searchApi(search, type, title);
    const teste4 = (title === 'Foods') ? 'idMeal' : 'idDrink';

    if (returnApi === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (returnApi.length === 1) {
      history.push(`/${title.toLowerCase()}/${returnApi[0][teste4]}`);
    }

    setDrinksOrFood(returnApi);
  };

  const handleClickAllFilterFoods = async (item) => {
    if (item === 'Foods') {
      const teste20 = await requestApiAllFoods();
      setDrinksOrFood(teste20);
    } else {
      const teste21 = await requestApiAllDrinks();
      setDrinksOrFood(teste21);
    }
  };

  const handleClickFilter = async (item, page) => {
    setSelectButton(item);
    if (item !== selectButton) {
      const teste = await filterFoodsOrDrinks(item, page);
      setDrinksOrFood(teste);
    }
    if (page === 'Foods' && item === selectButton) {
      const teste10 = await requestApiAllFoods();
      setDrinksOrFood(teste10);
    }
    if (page === 'Drinks' && item === selectButton) {
      const teste11 = await requestApiAllDrinks();
      setDrinksOrFood(teste11);
    }
  };

  const context = {
    drinksOrFood,
    handleClickFilter,
    setDrinksOrFood,
    fetchApiFoodOrDrink,
    handleClickAllFilterFoods,
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
