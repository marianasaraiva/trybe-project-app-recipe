import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { handleFavorite, removeFavorite } from '../helpers';
import { getLocalStorage } from '../services/LocalStorage';

const FavoriteButtonFoods = ({ id, details }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (getLocalStorage('favoriteRecipes')) {
      const teste3 = JSON.parse(getLocalStorage('favoriteRecipes'));
      teste3.forEach((item) => {
        if (item.id === id) {
          setIsFavorite(true);
        }
      });
    }
  }, [id]);

  return (
    <div>
      { !isFavorite ? (
        <button
          type="button"
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
          onClick={ () => {
            handleFavorite(details);
            setIsFavorite(true);
          } }
        >
          <img alt="notIsFavorite" />
        </button>)
        : (
          <button
            type="button"
            data-testid="favorite-btn"
            src={ blackHeartIcon }
            onClick={ () => {
              removeFavorite(id);
              setIsFavorite(false);
            } }
          >
            <img alt="isFavorite" />
          </button>)}
    </div>
  );
};

FavoriteButtonFoods.propTypes = {
  id: PropTypes.number,
  details: PropTypes.array,
}.isRequired;

export default FavoriteButtonFoods;
