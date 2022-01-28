import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import { requestApiAllDrinks } from '../services/requestApi';

const Drinks = () => {
  const { drinksOrFood, setDrinksOrFood } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if (drinksOrFood.length === 1) {
      history.push(`/drinks/${drinksOrFood[0].idDrink}`);
    }
  }, [drinksOrFood, history]);

  useEffect(() => {
    const teste2 = async () => {
      const teste = await requestApiAllDrinks();
      console.log(teste);
      return setDrinksOrFood(teste);
    };
    teste2();
  }, [setDrinksOrFood]);

  return (
    <div>
      <Header title="Drinks" />
      { drinksOrFood.length > 1 && (
        drinksOrFood.slice(0, +'12').map((bebida, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ bebida.strDrinkThumb }
              alt="img comida"
              data-testid={ `${index}-card-img` }
            />
            <h1 data-testid={ `${index}-card-name` }>{ bebida.strDrink }</h1>
          </div>
        ))
      )}
      <Footer />
    </div>
  );
};

export default Drinks;
