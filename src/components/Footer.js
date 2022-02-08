import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './components.css/Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <footer className="container-footer" data-testid="footer">

      <div>
        <button
          className="btn_icon"
          type="button"
          onClick={ () => history.push('/drinks') }
        >
          <img src={ drinkIcon } alt="drinks-bottom" data-testid="drinks-bottom-btn" />
        </button>
      </div>

      <div>
        <button
          className="btn_icon"
          type="button"
          onClick={ () => history.push('/explore') }
        >
          <img
            src={ exploreIcon }
            alt="explore-botton"
            data-testid="explore-bottom-btn"
          />
        </button>
      </div>

      <div>
        <button
          className="btn_icon"
          type="button"
          onClick={ () => history.push('/foods') }
        >
          <img src={ mealIcon } alt="food-bottom" data-testid="food-bottom-btn" />
        </button>
      </div>

    </footer>
  );
}

export default Footer;
