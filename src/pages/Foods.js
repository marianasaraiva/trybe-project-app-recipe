import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import { requestApiAllFoods, requestApiFoodsList } from '../services/requestApi';

const Foods = () => {
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
  //     history.push(`/foods/${drinksOrFood[0].idMeal}`);
  //   }
  // }, [drinksOrFood, history]);

  useEffect(() => {
    const teste2 = async () => {
      const teste = await requestApiAllFoods();
      const returnOptionsApi = await requestApiFoodsList();
      setFilterOptions(returnOptionsApi);
      return setDrinksOrFood(teste);
    };
    teste2();
  }, [setDrinksOrFood]);

  return (
    <div>
      <Header title="Foods" />
      <div>
        { filterOptions.map(({ strCategory }) => (
          <button
            type="button"
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => handleClickFilter(strCategory, 'Foods') }
          >
            {strCategory}
          </button>
        ))}
        <button
          data-testid="All-category-filter"
          onClick={ () => handleClickAllFilterFoods('Foods') }
          type="button"
        >
          All
        </button>
      </div>
      { drinksOrFood.length > 0 && (
        drinksOrFood.map((comida, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/foods/${comida.idMeal}`) }
          >
            <img
              src={ comida.strMealThumb }
              alt="img comida"
              data-testid={ `${index}-card-img` }
            />
            <h1 data-testid={ `${index}-card-name` }>{ comida.strMeal }</h1>
          </button>
        ))
      )}
      <Footer />
    </div>
  );
};

export default Foods;
