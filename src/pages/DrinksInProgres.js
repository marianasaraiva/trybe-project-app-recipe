import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FavoriteButtonsDrinks from '../components/FavoriteButtonDrinks';
import { concatItensRecipes } from '../helpers';
import { getLocalStorage, setLocalStorage } from '../services/LocalStorage';
import { getDetailsDrinks } from '../services/requestApi';
import './pages.css/FoodsInProgress.css';

function FoodsInProgress() {
  const { id } = useParams();
  const [itens, setItens] = useState([]);
  const [filter, setFilter] = useState([]);
  const [checkBox, setCheckBox] = useState([]);
  const [shareButton, setShareButton] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const teste44 = async (idParam) => {
      const returnApi = await getDetailsDrinks(idParam);
      setItens(returnApi);
      setFilter(concatItensRecipes(returnApi[0]));
    };
    teste44(id);
    if (getLocalStorage('inProgressRecipes')) {
      const item = JSON.parse(getLocalStorage('inProgressRecipes'));
      const arr = item.cocktails;
      console.log(arr[id]);
      setCheckBox(arr[id]);
    } else {
      const setStorage = {
        cocktails: {
          [id]: '',
        },
        meals: {},
      };
      setLocalStorage('inProgressRecipes', JSON.stringify(setStorage));
    }
  }, [id, setItens]);

  const checkInput = (index) => {
    const item = JSON.parse(getLocalStorage('inProgressRecipes'));

    if (!item.cocktails[id]) item.cocktails[id] = [];

    if (item.cocktails[id].includes(index)) {
      const remove = item.cocktails[id].filter((i) => i !== index);
      const newObj = { ...item, cocktails: { ...item.cocktails, [id]: remove } };
      setLocalStorage('inProgressRecipes', JSON.stringify(newObj));
      setCheckBox(remove);
    } else {
      const ids = [...item.cocktails[id], index];
      const newObjSet = { ...item, cocktails: { ...item.cocktails, [id]: ids } };
      setLocalStorage('inProgressRecipes', JSON.stringify(newObjSet));
      setCheckBox(ids);
    }
  };

  const clipBoardCopy = async () => {
    setShareButton(true);
    // https://www.kindacode.com/article/react-copy-to-clipboard-when-click-a-button-link/
    await navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
  };

  return (
    itens.length > 0 && (
      <div>
        <img data-testid="recipe-photo" src={ itens[0].strDrinkThumb } alt="img" />
        <p data-testid="recipe-title">{ itens[0].strDrink }</p>
        {shareButton && <p>Link copied!</p>}
        <button
          type="button"
          data-testid="share-btn"
          onClick={ clipBoardCopy }
        >
          Share
        </button>
        <FavoriteButtonsDrinks id={ id } details={ itens[0] } />
        <p data-testid="recipe-category">{ itens[0].strCategory }</p>
        {filter.map((igredient, index) => (
          <div key={ index }>
            <label
              htmlFor={ `${index}-ingredient-step` }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                id={ `${index}-ingredient-step` }
                checked={ checkBox.includes(index) }
                onChange={ () => checkInput(index) }
                type="checkbox"
              />
              <span
                className={ checkBox.includes(index) ? 'marked' : 'notmarked' }
              >
                {igredient}
              </span>
            </label>
          </div>
        ))}
        <p data-testid="instructions">{ itens[0].strInstructions }</p>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ checkBox.length !== filter.length }
          onClick={ () => history.push('/done-recipes') }
        >
          Finalizar Receita
        </button>
      </div>
    ));
}

export default FoodsInProgress;
