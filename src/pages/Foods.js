import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import './pages.css/Foods.css';
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
      <div className="container_foods">
        <div className="container_category">
          <button
            className="btn_category"
            data-testid="All-category-filter"
            onClick={ () => handleClickAllFilterFoods('Foods') }
            type="button"
          >
            All
          </button>
          { filterOptions.length > 0 && filterOptions.map(({ strCategory }) => (
            <button
              className="btn_category"
              type="button"
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => handleClickFilter(strCategory, 'Foods') }
            >
              {strCategory}
            </button>
          ))}
        </div>
        <div className="container-card">
          { drinksOrFood.length > 0 && (
            drinksOrFood.slice(0, +'12').map((comida, index) => (
              <button
                className="card-food"
                key={ index }
                type="button"
                data-testid={ `${index}-recipe-card` }
                onClick={ () => history.push(`/foods/${comida.idMeal}`) }
              >
                <img
                  className="image-food"
                  src={ comida.strMealThumb }
                  alt="img comida"
                  data-testid={ `${index}-card-img` }
                />
                <div className="container-title-food">
                  <h1
                    className="title-food"
                    data-testid={ `${index}-card-name` }
                  >
                    { comida.strMeal }
                  </h1>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Foods;
