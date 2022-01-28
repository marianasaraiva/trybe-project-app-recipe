import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import searchApi from '../services/requestApi';
// import { useHistory } from 'react-router-dom';

const Provider = ({ children }) => {
  const [drinksOrFood, setDrinksOrFood] = useState([]);

  const fetchApiFoodOrDrink = async (search, type) => {
    const teste = searchApi(search, type);
    setDrinksOrFood(teste);
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
