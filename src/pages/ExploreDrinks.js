import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getRandomDrink } from '../services/requestApi';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinks() {
  const history = useHistory();
  const [result, setResult] = useState(0);

  const returnAPI = async () => {
    const response = await getRandomDrink();
    console.log(response[0].idDrink);
    setResult(response[0].idDrink);
  };

  useEffect(() => {
    returnAPI();
  }, []);

  return (
    <div>
      <Header title="Explore Drinks" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => history.push(`/drinks/${result}`) }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
