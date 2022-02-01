import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { getIngredientsFood } from '../services/requestApi';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoodIngredients() {
  const [arrIngredients, setArrIngredients] = useState([]);
  // const history = useHistory();

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
        {console.log(arrIngredients)}
        {arrIngredients.map((ingredient, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${index}-ingredient-card` }
            // onClick={ () => history.push(`/foods/${ingredient.idMeal}`) }
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
