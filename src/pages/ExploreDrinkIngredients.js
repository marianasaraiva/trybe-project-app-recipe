import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getIngredientsDrink } from '../services/requestApi';
import Context from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinkIngredients() {
  const [arrIngredientsDrink, setArrIngredientsDrink] = useState([]);
  const { setGlobalValue } = useContext(Context);
  const history = useHistory();

  const returnAPIIngredientsDrink = async () => {
    const response = await getIngredientsDrink();
    setArrIngredientsDrink(response);
  };

  useEffect(() => {
    returnAPIIngredientsDrink();
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients" />
      { arrIngredientsDrink.map((drink, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => {
            setGlobalValue(drink.strIngredient1);
            history.push('/drinks');
          } }
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
            alt="imagem do ingrediente"
            data-testid={ `${index}-card-img` }
          />
          <h1 data-testid={ `${index}-card-name` }>{ drink.strIngredient1 }</h1>
        </button>
      ))}
      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredients;
