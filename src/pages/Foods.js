import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import { requestApiAllFoods } from '../services/requestApi';

const Foods = () => {
  const { drinksOrFood, setDrinksOrFood } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if (drinksOrFood.length === 1) {
      history.push(`/foods/${drinksOrFood[0].idMeal}`);
    }
  }, [drinksOrFood, history]);

  useEffect(() => {
    const teste2 = async () => {
      const teste = await requestApiAllFoods();
      return setDrinksOrFood(teste);
    };
    teste2();
  }, [setDrinksOrFood]);

  return (
    <div>
      <Header title="Foods" />
      { drinksOrFood.length > 1 && (
        drinksOrFood.slice(0, +'12').map((comida, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ comida.strMealThumb }
              alt="img comida"
              data-testid={ `${index}-card-img` }
            />
            <h1 data-testid={ `${index}-card-name` }>{ comida.strMeal }</h1>
          </div>
        ))
      )}
      <Footer />
    </div>
  );
};

export default Foods;
