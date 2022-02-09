import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLocalStorage, setLocalStorage } from '../services/LocalStorage';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './pages.css/FavoriteRecipes.css';

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
    <div className="display-grid">
      <div className="Profile">
        <Header title="Favorite Recipes" />
      </div>
      <div className="btns-favorites-recipes">
        <button
          className="btn-favorites-recipes"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('') }
        >
          All
        </button>
        <button
          className="btn-favorites-recipes"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('food') }
        >
          Foods
        </button>
        <button
          className="btn-favorites-recipes"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
      </div>
      <div className="flex ">
        {favoriteRecipe && favoriteRecipe
          .filter(({ type }) => type.includes(filter))
          .map((item, index) => (
            <>
              <div className="container-img">
                <Link to={ `/${item.type}s/${item.id}` }>
                  <img
                    className="img-food"
                    data-testid={ `${index}-horizontal-image` }
                    src={ item.image }
                    alt="img"
                  />
                </Link>
              </div>

              <div className="container-atributes">
                <Link to={ `/${item.type}s/${item.id}` }>
                  <p
                    className="text"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { `${item.name}` }

                  </p>
                </Link>
                <div>
                  <button
                    type="button"
                    data-testid={ `${index}-horizontal-share-btn` }
                    onClick={ () => clipBoardCopy(item.id, item.type) }
                  >
                    <img
                      className="img-btn"
                      src={ shareIcon }
                      alt="Compartilhar"
                    />
                  </button>
                  <button
                    type="button"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    onClick={ () => deleteFavoriteStore(item.id) }
                  >
                    <img
                      className="img-btn"
                      src={ blackHeartIcon }
                      alt="Favoritas"
                    />
                  </button>

                </div>
                {shareButton && <p>Link copied!</p>}
              </div>
            </>
          ))}
      </div>
    </div>);
}

export default FavoriteRecipes;
