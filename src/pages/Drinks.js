import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import { requestApiAllDrinks, requestApiDrinksList } from '../services/requestApi';

const Drinks = () => {
  const {
    drinksOrFood,
    setDrinksOrFood,
    handleClickFilter,
    handleClickAllFilterFoods,
  } = useContext(Context);
  const [filterOptions, setFilterOptions] = useState([]);
  const history = useHistory();

  // useEffect(() => {
  //   if (drinksOrFood.length === 1) {
  //     history.push(`/drinks/${drinksOrFood[0].idDrink}`);
  //   }
  // }, [drinksOrFood, history]);

  useEffect(() => {
    const teste2 = async () => {
      const teste = await requestApiAllDrinks();
      const returnOptionsListDrink = await requestApiDrinksList();
      setFilterOptions(returnOptionsListDrink);
      return setDrinksOrFood(teste);
    };
    teste2();
  }, [setDrinksOrFood]);

  return (
    <div>
      <Header title="Drinks" />
      <div>
        { filterOptions.map(({ strCategory }) => (
          <button
            type="button"
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => handleClickFilter(strCategory, 'Drinks') }
          >
            {strCategory}
          </button>
        )) }
        <button
          data-testid="All-category-filter"
          onClick={ () => handleClickAllFilterFoods('Drinks') }
          type="button"
        >
          All
        </button>
      </div>
      { drinksOrFood.length > 0 && (
        drinksOrFood.slice(0, +'12').map((bebida, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/drinks/${bebida.idDrink}`) }
          >
            <img
              src={ bebida.strDrinkThumb }
              alt="img comida"
              data-testid={ `${index}-card-img` }
            />
            <h1 data-testid={ `${index}-card-name` }>{ bebida.strDrink }</h1>
          </button>
        ))
      )}
      <Footer />
    </div>
  );
};

export default Drinks;
