import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import IgredientsAndValues from '../components/IgredientsAndValues';
import { getDetailsFoods, requestApiAllDrinks } from '../services/requestApi';
import './pages.css/FoodsDetails.css';

function FoodsDetails() {
  // const { match: { params: { id } } } = props;
  const { id } = useParams();
  const [detailsItem, setDetailsItem] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getRecomendation = async () => {
      const returnRecomendationDrinks = await requestApiAllDrinks();
      setRecomendation(returnRecomendationDrinks);
    };
    getRecomendation();
  }, []);

  useEffect(() => {
    const requestApi = async (idItem) => {
      const detailsFoods = await getDetailsFoods(idItem);
      setDetailsItem(detailsFoods);
    };
    requestApi(id);
  }, [id, setDetailsItem]);

  return (
    detailsItem.length > 0 && (
      <div>
        <img src={ detailsItem[0].strMealThumb } data-testid="recipe-photo" alt="img" />
        <h1 data-testid="recipe-title">{ detailsItem[0].strMeal }</h1>
        <button type="button" data-testid="share-btn">Share</button>
        <button type="button" data-testid="favorite-btn">Favorite</button>
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
          onClick={ () => history.push(`/foods/${id}/in-progress`) }
        >
          Start Recipe
        </button>
      </div>
    )
  );
}

FoodsDetails.propTypes = {
  id: PropTypes.number,
}.isRequired;

export default FoodsDetails;
