import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { concatItensRecipes, saveStorageDone } from '../helpers';
import { getLocalStorage, setLocalStorage } from '../services/LocalStorage';
import { getDetailsFoods } from '../services/requestApi';
// import FavoriteButtonFoods from '../components/FavoriteButtonFoods';
import './pages.css/FoodsInProgress.css';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FoodsInProgress() {
  const { id } = useParams();
  const [itens, setItens] = useState([]);
  const [filter, setFilter] = useState([]);
  const [checkBox, setCheckBox] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareButton, setShareButton] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (getLocalStorage('inProgressRecipes')) {
      const item = JSON.parse(getLocalStorage('inProgressRecipes'));
      const arr = item.meals;
      setCheckBox(arr[id]);
    } else {
      const setStorage = {
        cocktails: {},
        meals: {
          [id]: '',
        },
      };
      setLocalStorage('inProgressRecipes', JSON.stringify(setStorage));
    }
    const filterList = async (idParam) => {
      const returnApi = await getDetailsFoods(idParam);
      setItens(returnApi);
      setFilter(concatItensRecipes(returnApi[0]));
    };
    filterList(id);
  }, [id, setItens]);

  const checkInput = (index) => {
    const item = JSON.parse(getLocalStorage('inProgressRecipes'));

    if (!item.meals[id]) item.meals[id] = [];

    if (item.meals[id].includes(index)) {
      const remove = item.meals[id].filter((i) => i !== index);
      const newObj = { ...item, meals: { ...item.meals, [id]: remove } };
      setLocalStorage('inProgressRecipes', JSON.stringify(newObj));
      setCheckBox(remove);
    } else {
      const ids = [...item.meals[id], index];
      const newObjSet = { ...item, meals: { ...item.meals, [id]: ids } };
      setLocalStorage('inProgressRecipes', JSON.stringify(newObjSet));
      setCheckBox(ids);
    }
  };

  const clipBoardCopy = async () => {
    setShareButton(true);
    // https://www.kindacode.com/article/react-copy-to-clipboard-when-click-a-button-link/
    await navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
  };

  return (
    itens.length > 0
      && (
        <div className="container-details">
          <img
            className="img_header"
            data-testid="recipe-photo"
            src={ itens[0].strMealThumb }
            alt="img"
          />

          <div className="container-title-food-details">
            <div className="container-fluid-title">
              <p
                className="food-title"
                data-testid="recipe-title"
              >
                { itens[0].strMeal }
              </p>
              <p
                className="category-title"
                data-testid="recipe-category"
              >
                { itens[0].strCategory }

              </p>
            </div>

            <div className="container-share-favorite">
              <button
                className="img-share img-style"
                type="button"
                data-testid="share-btn"
                onClick={ clipBoardCopy }
              >
                <img className="width" src={ ShareIcon } alt="Icon share" />
              </button>
              { !isFavorite ? (
                <button
                  className="img-favorite img-style"
                  type="button"
                  data-testid="favorite-btn"
                  src={ whiteHeartIcon }
                  onClick={ () => {
                    handleFavorite(detailsItem[0]);
                    setIsFavorite(true);
                  } }
                >
                  <img className="width" src={ whiteHeartIcon } alt="notIsFavorite" />
                </button>)
                : (
                  <button
                    type="button"
                    data-testid="favorite-btn"
                    onClick={ () => {
                      removeFavorite(id);
                      setIsFavorite(false);
                    } }
                  >
                    <img className="width" src={ blackHeartIcon } alt="isFavorite" />
                  </button>
                )}
              <div>{shareButton && <p>Link copied!</p>}</div>
            </div>

          </div>

          <div className="container-ingredients grid">
            {filter.map((igredient, index) => (
              <div
                className="container-check"
                key={ index }
              >
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
          </div>

          <div className="instructions-container margin-botton">
            <p data-testid="instructions">{ itens[0].strInstructions }</p>
          </div>

          <div className="container-start-recipes">
            <button
              className="buttonFooter"
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ checkBox.length !== filter.length }
              onClick={ () => {
                saveStorageDone(itens[0], 'food');
                history.push('/done-recipes');
              } }
            >
              Finalizar Receita
            </button>
          </div>
        </div>
      ));
}

export default FoodsInProgress;
