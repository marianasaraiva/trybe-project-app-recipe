import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import IgredientsAndValues from '../components/IgredientsAndValues';
import { getDetailsFoods, requestApiAllDrinks } from '../services/requestApi';
import './pages.css/FoodsDetails.css';

function FoodsDetails(props) {
  const { match: { params: { id } } } = props;
  const [detailsItem, setDetailsItem] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const teste = async (idItem) => {
      const teste2 = await getDetailsFoods(idItem);
      console.log(teste2);
      setDetailsItem(teste2.meals);
    };
    teste(id);
  }, [id, setDetailsItem]);

  useEffect(() => {
    const getRecomendation = async () => {
      const returnRecomendationDrinks = await requestApiAllDrinks();
      setRecomendation(returnRecomendationDrinks);
    };
    getRecomendation();
  }, [setRecomendation]);

  return (
    detailsItem.length > 0 && (
      <div>
        {/* {console.log(detailsItem[0])} */}
        <img src={ detailsItem[0].strMealThumb } data-testid="recipe-photo" alt="img" />
        <h1 data-testid="recipe-title">{detailsItem[0].strMeal}</h1>
        <button
          type="button"
          data-testid="share-btn"
        >
          Share
        </button>
        <button type="button" data-testid="favorite-btn">Favorite</button>
        <p data-testid="recipe-category">{detailsItem[0].strCategory}</p>
        <IgredientsAndValues typeFilter="strIngredient" detailsItem={ detailsItem[0] } />
        <IgredientsAndValues typeFilter="strMeasure" detailsItem={ detailsItem[0] } />
        <p data-testid="instructions">{ detailsItem[0].strInstructions }</p>
        <video data-testid="video"><track kind="captions" /></video>
        {console.log(recomendation)}
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
          className="buttonFooter"
          data-testid="start-recipe-btn"
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
