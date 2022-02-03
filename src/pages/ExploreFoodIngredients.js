import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getIngredientsFood } from '../services/requestApi';
import Context from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoodIngredients() {
  const [arrIngredients, setArrIngredients] = useState([]);
  const { setGlobalValue } = useContext(Context);
  const history = useHistory();

  const returnAPIIngredients = async () => {
    const response = await getIngredientsFood();
    setArrIngredients(response);
  };

  useEffect(() => {
    returnAPIIngredients();
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients" />
      <div>
        {arrIngredients.map((ingredient, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => {
              setGlobalValue(ingredient.strIngredient);
              history.push('/foods');
            } }
          >
            <img
              src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              alt="imagem do ingrediente"
              data-testid={ `${index}-card-img` }
            />
            <h1 data-testid={ `${index}-card-name` }>{ ingredient.strIngredient }</h1>
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodIngredients;
