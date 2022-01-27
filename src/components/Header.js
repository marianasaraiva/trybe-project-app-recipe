import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [hidden, setHidden] = useState(false);
  const history = useHistory();
  return (
    <header>
      <div>
        <button
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img src={ profileIcon } data-testid="profile-top-btn" alt="profile" />
        </button>
        <h1 data-testid="page-title">Foods</h1>
        <button
          type="button"
          onClick={ () => setHidden(!hidden) }
        >
          <img src={ searchIcon } data-testid="search-top-btn" alt="search" />
        </button>
        { hidden && <input
          type="text"
          data-testid="search-input"
        /> }
      </div>
    </header>
  );
}

export default Header;
