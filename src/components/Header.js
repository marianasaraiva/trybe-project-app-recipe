import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchInput from './SearchInput';
import './components.css/Header.css';

const removeScan = [
  'Explore',
  'Explore Foods',
  'Explore Drinks',
  'Explore Ingredients',
  'Profile',
  'Done Recipes',
  'Favorite Recipes',
];

function Header({ title }) {
  const [hidden, setHidden] = useState(false);
  const history = useHistory();
  return (
    <header>
      <div className="container-fluid-header ">
        <button
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img
            className="icon"
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="profile"
          />
        </button>
        <h1
          className="title font-size"
          data-testid="page-title"
        >
          { title }
        </h1>
        {removeScan.includes(title) === false
        && (
          <button
            type="button"
            onClick={ () => setHidden(!hidden) }
          >
            <img
              className="icon"
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="search"
            />
          </button>
        )}
      </div>
      <div>
        { hidden && <SearchInput title={ title } /> }
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
