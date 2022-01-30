import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import IgredientsAndValues from '../components/IgredientsAndValues';
import { getDetailsFoods, requestApiAllDrinks } from '../services/requestApi';
import './pages.css/FoodsDetails.css';
import { getLocalStorage, setLocalStorage } from '../services/LocalStorage';
import { concatItensRecipes, handleFavorite, removeFavorite } from '../helpers';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const i = 'strIngredient';
const x = 'strMeasure';

function FoodsDetails() {
  const { id } = useParams();
  const [detailsItem, setDetailsItem] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [shareButton, setShareButton] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [button, setButton] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getRecomendation = async () => {
      const returnRecomendationDrinks = await requestApiAllDrinks();
      setRecomendation(returnRecomendationDrinks);
    };
    getRecomendation();
  }, []);

  useEffect(() => {
    if (getLocalStorage('inProgressRecipes')) {
      const teste = JSON.parse(getLocalStorage('inProgressRecipes'));
      console.log(Object.keys(teste.meals).includes(id));
      setButton(Object.keys(teste.meals).includes(id));
    }
    if (getLocalStorage('favoriteRecipes')) {
      const teste3 = JSON.parse(getLocalStorage('favoriteRecipes'));
      teste3.forEach((item) => {
        if (item.id === id) {
          setIsFavorite(true);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    const requestApi = async (idItem) => {
      const detailsFoods = await getDetailsFoods(idItem);
      setDetailsItem(detailsFoods);
    };
    requestApi(id);
  }, [id, setDetailsItem]);

  const handleClickStartContinue = () => {
    const filter = concatItensRecipes(detailsItem[0], i, x);
    if (getLocalStorage('inProgressRecipes')) {
      const returnStorage = JSON.parse(getLocalStorage('inProgressRecipes'));
      const attStorage = {
        ...returnStorage,
        meals: {
          ...returnStorage.meals,
          [id]: filter,
        },
      };
      setLocalStorage('inProgressRecipes', JSON.stringify(attStorage));
      history.push(`/foods/${id}/in-progress`);
    } else {
      const setStorage = {
        cocktails: {},
        meals: {
          [id]: filter,
        },
      };
      setLocalStorage('inProgressRecipes', JSON.stringify(setStorage));
      history.push(`/foods/${id}/in-progress`);
    }
  };

  const clipBoardCopy = async () => {
    setShareButton(true);
    // https://www.kindacode.com/article/react-copy-to-clipboard-when-click-a-button-link/
    await navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
  };

  return (
    detailsItem.length > 0 && (
      <div>
        {console.log(detailsItem[0])}
        <img src={ detailsItem[0].strMealThumb } data-testid="recipe-photo" alt="img" />
        <h1 data-testid="recipe-title">{ detailsItem[0].strMeal }</h1>
        {shareButton && <p>Link copied!</p>}
        <button
          type="button"
          data-testid="share-btn"
          onClick={ clipBoardCopy }
        >
          Share
        </button>
        { !isFavorite ? (
          <button
            type="button"
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
            onClick={ () => {
              handleFavorite(detailsItem[0]);
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
        <p data-testid="recipe-category">{ detailsItem[0].strCategory }</p>
        <IgredientsAndValues typeFilter="strIngredient" detailsItem={ detailsItem[0] } />
        <IgredientsAndValues typeFilter="strMeasure" detailsItem={ detailsItem[0] } />
        <p data-testid="instructions">{ detailsItem[0].strInstructions }</p>
        <video data-testid="video"><track kind="captions" /></video>
        <div className="recomendations">
          {recomendation.slice(0, +'6').map((item, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recomendation-card` }
              className="divImg"
            >
              <p data-testid={ `${index}-recomendation-title` }>{item.strDrink }</p>
              <img src={ item.strDrinkThumb } alt={ index } />
            </div>
          ))}
        </div>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="buttonFooter"
          onClick={ handleClickStartContinue }
        >
          {!button ? 'Start Recipe' : 'Continue Recipe'}
        </button>
      </div>
    )
  );
}

FoodsDetails.propTypes = {
  id: PropTypes.number,
}.isRequired;

export default FoodsDetails;
