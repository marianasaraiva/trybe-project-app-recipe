import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import IgredientsAndValues from '../components/IgredientsAndValues';
import { getDetailsFoods, requestApiAllDrinks } from '../services/requestApi';
import './pages.css/FoodsDetails.css';
import { getLocalStorage, setLocalStorage } from '../services/LocalStorage';
import { handleFavorite, removeFavorite } from '../helpers';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../components/components.css/IngredientAndValues.css';
import ShareIcon from '../images/shareIcon.svg';

// const i = 'strIngredient';
// const x = 'strMeasure';

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
    // const filter = concatItensRecipes(detailsItem[0], i, x);
    if (getLocalStorage('inProgressRecipes')) {
      const returnStorage = JSON.parse(getLocalStorage('inProgressRecipes'));
      const attStorage = {
        ...returnStorage,
        meals: {
          ...returnStorage.meals,
          [id]: '',
        },
      };
      setLocalStorage('inProgressRecipes', JSON.stringify(attStorage));
      history.push(`/foods/${id}/in-progress`);
    } else {
      const setStorage = {
        cocktails: {},
        meals: {
          [id]: '',
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
      <div className="container-details">
        <img
          className="img_header"
          src={ detailsItem[0].strMealThumb }
          data-testid="recipe-photo"
          alt="img"
        />

        <div className="container-title-food-details">
          <div className="container-fluid-title">
            <h1
              className="food-title"
              data-testid="recipe-title"
            >
              { detailsItem[0].strMeal }

            </h1>
            <p
              className="category-title"
              data-testid="recipe-category"
            >
              { detailsItem[0].strCategory }
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

        <div className="container-ingredients">
          <IgredientsAndValues
            typeFilter="strIngredient"
            detailsItem={ detailsItem[0] }
          />
          <IgredientsAndValues
            typeFilter="strMeasure"
            detailsItem={ detailsItem[0] }
          />
        </div>
        <iframe
          className="vide-tube"
          src={ `https://www.youtube.com/embed/${detailsItem[0].strYoutube.split('v=')[1]}` }
          frameBorder="0"
          allowFullScreen
          title="video"
          data-testid="video"
        />
        <p
          className="instructions-container"
          data-testid="instructions"
        >
          { detailsItem[0].strInstructions }
        </p>

        <div className="recomendations">
          {recomendation.slice(0, +'6').map((item, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recomendation-card` }
              className="divImg card-food-test"
            >
              <p data-testid={ `${index}-recomendation-title` }>{item.strDrink }</p>
              <img
                src={ item.strDrinkThumb }
                alt={ index }
              />
            </div>
          ))}
        </div>

        <div className="container-start-recipes">
          <button
            className="buttonFooter"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleClickStartContinue }
          >
            {!button ? 'Start Recipe' : 'Continue Recipe'}
          </button>
        </div>
      </div>
    )
  );
}

FoodsDetails.propTypes = {
  id: PropTypes.number,
}.isRequired;

export default FoodsDetails;
