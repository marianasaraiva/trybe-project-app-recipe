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
    <div>
      <Header title="Explore Foods" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => history.push(`/foods/${result}`) }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
