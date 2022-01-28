import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import searchApi from '../services/requestApi';
// import { useHistory } from 'react-router-dom';

const Provider = ({ children }) => {
  const [drinksOrFood, setDrinksOrFood] = useState([]);

  const fetchApiFoodOrDrink = async (search, type, title) => {
    const returnAPi = await searchApi(search, type, title);

    if (teste === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setDrinksOrFood(returnAPi);
  };

  const context = {
    drinksOrFood,
    fetchApiFoodOrDrink,
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
