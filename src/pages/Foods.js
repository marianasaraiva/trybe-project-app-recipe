import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import {
  requestApiAllFoods,
  requestApiFoodsList,
  searchApi } from '../services/requestApi';

const Foods = () => {
  const {
    drinksOrFood,
    setDrinksOrFood,
    handleClickFilter,
    handleClickAllFilterFoods,
    globalValue,
    setGlobalValue,
  } = useContext(Context);
  const [filterOptions, setFilterOptions] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const returnOptionsAPi = async () => {
      const returnOptionsApi = await requestApiFoodsList();
      setFilterOptions(returnOptionsApi);
    };
    returnOptionsAPi();
  }, [setFilterOptions]);

  useEffect(() => {
    const setFoodsApi = async () => {
      const returnFoods = await requestApiAllFoods();
      // Ajuda na lógica do colega Hugo Daniel
      if (globalValue) {
        const result = await searchApi(globalValue, 'ingredient', 'Foods');
        setDrinksOrFood(result);
        setGlobalValue(undefined);
      } else {
        setDrinksOrFood(returnFoods);
      }
    };
    setFoodsApi();
  }, [setDrinksOrFood]);

  return (
    <div>
      <Header title="Foods" />
      <div>
        { filterOptions.length > 0 && filterOptions.map(({ strCategory }) => (
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
        drinksOrFood.slice(0, +'12').map((comida, index) => (
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
