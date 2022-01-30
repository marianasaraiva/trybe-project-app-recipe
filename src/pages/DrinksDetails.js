import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import IgredientsAndValues from '../components/IgredientsAndValues';
import { getDetailsDrinks, requestApiAllFoods } from '../services/requestApi';
import './pages.css/FoodsDetails.css';
import { getLocalStorage, setLocalStorage } from '../services/LocalStorage';
import { concatItensRecipes, handleFavoriteDrinks, removeFavorite } from '../helpers';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const i = 'strIngredient';
const x = 'strMeasure';

function DrinksDetails(props) {
  const { match: { params: { id } } } = props;
  const [detailsItem, setDetailsItem] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [shareButton, setShareButton] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [button, setButton] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const teste = async (idItem) => {
      const teste2 = await getDetailsDrinks(idItem);
      setDetailsItem(teste2.drinks);
    };
    teste(id);
  }, [id, setDetailsItem]);

  useEffect(() => {
    if (getLocalStorage('inProgressRecipes')) {
      const teste = JSON.parse(getLocalStorage('inProgressRecipes'));
      console.log(Object.keys(teste.cocktails).includes(id));
      setButton(Object.keys(teste.cocktails).includes(id));
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

  const handleClickStartContinue = () => {
    const filter = concatItensRecipes(detailsItem[0], i, x);
    if (getLocalStorage('inProgressRecipes')) {
      const returnStorage = JSON.parse(getLocalStorage('inProgressRecipes'));
      const attStorage = {
        ...returnStorage,
        cocktails: {
          ...returnStorage.cocktails,
          [id]: filter,
        },
      };
      setLocalStorage('inProgressRecipes', JSON.stringify(attStorage));
      history.push(`/drinks/${id}/in-progress`);
    } else {
      const setStorage = {
        cocktails: {
          [id]: filter,
        },
        meals: {},
      };
      setLocalStorage('inProgressRecipes', JSON.stringify(setStorage));
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  useEffect(() => {
    const getRecomendation = async () => {
      const getRecomendationFoods = await requestApiAllFoods();
      setRecomendation(getRecomendationFoods);
    };
    getRecomendation();
  }, []);

  const clipBoardCopy = async () => {
    setShareButton(true);
    // https://www.kindacode.com/article/react-copy-to-clipboard-when-click-a-button-link/
    await navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
  };

  return (
    detailsItem.length > 0 && (
      <div>
        {console.log(detailsItem[0])}
        <img src={ detailsItem[0].strDrinkThumb } data-testid="recipe-photo" alt="img" />
        <h1 data-testid="recipe-title">{ detailsItem[0].strDrink }</h1>
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
              handleFavoriteDrinks(detailsItem[0]);
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
        <p data-testid="recipe-category">{ detailsItem[0].strAlcoholic }</p>
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
              <p data-testid={ `${index}-recomendation-title` }>{item.strMeal }</p>
              <img src={ item.strMealThumb } alt={ index } />
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

DrinksDetails.propTypes = {
  id: PropTypes.number,
}.isRequired;

export default DrinksDetails;
