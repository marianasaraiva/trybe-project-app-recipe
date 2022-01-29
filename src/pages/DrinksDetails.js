import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import IgredientsAndValues from '../components/IgredientsAndValues';
import { getDetailsDrinks, requestApiAllFoods } from '../services/requestApi';
import './pages.css/FoodsDetails.css';

function DrinksDetails(props) {
  const { match: { params: { id } } } = props;
  const [detailsItem, setDetailsItem] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const teste = async (idItem) => {
      const teste2 = await getDetailsDrinks(idItem);
      setDetailsItem(teste2.drinks);
    };
    teste(id);
  }, [id, setDetailsItem]);

  useEffect(() => {
    const getRecomendation = async () => {
      const getRecomendationFoods = await requestApiAllFoods();
      setRecomendation(getRecomendationFoods);
    };
    getRecomendation();
  }, []);

  return (
    detailsItem.length > 0 && (
      <div>
        <img src={ detailsItem[0].strDrinkThumb } data-testid="recipe-photo" alt="img" />
        <h1 data-testid="recipe-title">{ detailsItem[0].strDrink }</h1>
        <button type="button" data-testid="share-btn">Share</button>
        <button type="button" data-testid="favorite-btn">Favorite</button>
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
          onClick={ () => history.push(`/drinks/${id}/in-progress`) }
        >
          Start Recipe
        </button>
      </div>
    )
  );
}

DrinksDetails.propTypes = {
  id: PropTypes.number,
}.isRequired;

export default DrinksDetails;
