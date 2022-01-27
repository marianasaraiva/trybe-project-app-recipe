import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
// import { useHistory } from 'react-router-dom';

const Provider = ({ children }) => (
  <Context.Provider>
    {children}
  </Context.Provider>
);

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
