import React, { useState, useEffect } from 'react';
import { getLocalStorage } from '../services/LocalStorage';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipe, setFavoriteRecipe] = useState([]);
  console.log(favoriteRecipe);

  useEffect(() => {
    const getSaveFavorites = JSON.parse(getLocalStorage('favoriteRecipes'));
    setFavoriteRecipe(getSaveFavorites);
  }, []);

  return (
    <div>
      <Header title="Favorite Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {favoriteRecipe && favoriteRecipe
        .map((item, index) => (
          <>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ item.image }
              alt="img"
            />
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {item.alcoholicOrNot
                ? (`${item.nationality} - ${item.category} - ${item.alcoholicOrNot}`)
                : (`${item.nationality} - ${item.category}`) }
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{ `${item.name}` }</p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
            >
              <img
                alt="Compartilhar"
              />
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
            >
              <img
                alt="Favoritas"
              />
            </button>
          </>
        ))}
    </div>);
}

export default FavoriteRecipes;
