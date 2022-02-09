import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getRandomFood } from '../services/requestApi';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoods() {
  const history = useHistory();
  const [result, setResult] = useState(0);

  const returnAPI = async () => {
    const response = await getRandomFood();
    setResult(response[0].idMeal);
  };

  useEffect(() => {
    returnAPI();
  }, []);

  return (
    <div className="container-recipes">
      <div className="Profile">
        <Header title="Explore Foods" />
      </div>
      <div className="btns-favorites-recipes grid">
        <button
          className="btn-favorites-recipes2"
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          className="btn-favorites-recipes2"
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          className="btn-favorites-recipes2"
          type="button"
          data-testid="explore-surprise"
          onClick={ () => history.push(`/foods/${result}`) }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
