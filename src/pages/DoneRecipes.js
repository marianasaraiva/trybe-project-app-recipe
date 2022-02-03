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
    <>
      <Header title="Done Recipes" />
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
      {doneRecipes && doneRecipes
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
              { `${item.nationality} - ${item.category} - ${item.alcoholicOrNot}`}
            </p>
            <Link to={ `/${item.type}s/${item.id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{ `${item.name}` }</p>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>{ item.doneDate }</p>
            {item.tags && item.tags
              .map((tags, i) => (
                <p
                  key={ i }
                  data-testid={ `${index}-${tags}-horizontal-tag` }
                >
                  {tags}
                </p>))}
            {shareButton && <p>Link copied!</p>}
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ () => clipBoardCopy(item.id, item.type) }
            >
              Compartilhar
            </button>
          </>
        ))}
    </>);
};

export default DoneRecipes;
