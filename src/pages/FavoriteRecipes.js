import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLocalStorage, setLocalStorage } from '../services/LocalStorage';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipe, setFavoriteRecipe] = useState([]);
  const [shareButton, setShareButton] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const getSaveFavorites = JSON.parse(getLocalStorage('favoriteRecipes'));
    setFavoriteRecipe(getSaveFavorites);
  }, []);

  const clipBoardCopy = async (id, type) => {
    setShareButton(true);
    let setType = '';
    if (type === 'food') {
      setType = 'http://localhost:3000/foods/';
    } else {
      setType = 'http://localhost:3000/drinks/';
    }
    // https://www.kindacode.com/article/react-copy-to-clipboard-when-click-a-button-link/
    await navigator.clipboard.writeText(`${setType}${id}`);
  };

  const deleteFavoriteStore = (id) => {
    const previousFavorite = JSON.parse(getLocalStorage('favoriteRecipes'))
      .filter((unfollow) => unfollow.id !== id);
    setLocalStorage('favoriteRecipes', JSON.stringify(previousFavorite));
    setFavoriteRecipe(previousFavorite);
  };
  return (
    <div>
      <Header title="Favorite Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('food') }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drink') }
      >
        Drinks
      </button>
      {favoriteRecipe && favoriteRecipe
        .filter(({ type }) => type.includes(filter))
        .map((item, index) => (
          <>
            <Link to={ `/${item.type}s/${item.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ item.image }
                alt="img"
              />
            </Link>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {item.alcoholicOrNot
                ? (`${item.nationality} - ${item.category} - ${item.alcoholicOrNot}`)
                : (`${item.nationality} - ${item.category}`) }
            </p>
            <Link to={ `/${item.type}s/${item.id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{ `${item.name}` }</p>
            </Link>
            {shareButton && <p>Link copied!</p>}
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ () => clipBoardCopy(item.id, item.type) }
            >
              <img
                alt="Compartilhar"
              />
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              onClick={ () => deleteFavoriteStore(item.id) }
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
