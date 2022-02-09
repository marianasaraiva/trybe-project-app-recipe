import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getLocalStorage } from '../services/LocalStorage';
import shareIcon from '../images/shareIcon.svg';

const DoneRecipes = () => {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [shareButton, setShareButton] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const getAllRecipes = JSON.parse(getLocalStorage('doneRecipes'));
    setDoneRecipes(getAllRecipes);
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

  return (
    <div className="container-recipes">
      <div className="Profile">
        <Header title="Done Recipes" />
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
      <div className="flex-container ">
        {doneRecipes && doneRecipes
          .filter(({ type }) => type.includes(filter))
          .map((item, index) => (
            <>
              <div className="container-img">
                <Link to={ `/${item.type}s/${item.id}` }>
                  <img
                    className="img-food2"
                    data-testid={ `${index}-horizontal-image` }
                    src={ item.image }
                    alt="img"
                  />
                </Link>
              </div>

              <div className="container-atributes">
                <div className="display-flex">
                  <p
                    className="name2"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {item.alcoholicOrNot
                      // eslint-disable-next-line max-len
                      ? (`${item.nationality} - ${item.category} - ${item.alcoholicOrNot}`)
                      : (`${item.nationality} - ${item.category}`) }
                  </p>
                  <button
                    type="button"
                    data-testid={ `${index}-horizontal-share-btn` }
                    onClick={ () => clipBoardCopy(item.id, item.type) }
                  >
                    <img
                      className="img-btn2"
                      src={ shareIcon }
                      alt="share"
                    />
                  </button>
                </div>
                <Link to={ `/${item.type}s/${item.id}` }>
                  <p
                    className="text2"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { `${item.name}` }

                  </p>
                </Link>
                <div className="display-flex">
                  <p data-testid={ `${index}-horizontal-done-date` }>{ item.doneDate }</p>
                  {item.tags && item.tags
                    .map((tags) => (
                      <p
                        key={ tags }
                        data-testid={ `${index}-${tags}-horizontal-tag` }
                      >
                        {tags}
                      </p>))}

                </div>
                {shareButton && <p>Link copied!</p>}
              </div>
            </>
          ))}
      </div>
    </div>);
};

export default DoneRecipes;
