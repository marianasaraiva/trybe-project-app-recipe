import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './components.css/Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <button
        type="button"
        onClick={ () => history.pushState('/drinks') }
      >
        <img src={ drinkIcon } alt="drinks-bottom" data-testid="drinks-bottom-btn" />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explore') }
      >
        <img src={ exploreIcon } alt="explore-botton" data-testid="explore-bottom-btn" />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/foods') }
      >
        <img src={ mealIcon } alt="food-bottom" data-testid="food-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;
