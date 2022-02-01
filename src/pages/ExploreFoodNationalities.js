import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  getAreaNationalities,
  getFoodNationalities,
  requestApiAllFoods,
} from '../services/requestApi';
import Context from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoodNationalities() {
  const { drinksOrFood,
    setDrinksOrFood,
  } = useContext(Context);
  const [result, setResult] = useState([]);
  const [nationality, setNationality] = useState([]);
  const [country, setCountry] = useState('All');
  const history = useHistory();

  const returnAPIArea = async () => {
    const response = await getAreaNationalities();
    setResult(Object.values(response.map((e) => e.strArea)));
  };

  useEffect(() => {
    returnAPIArea();
  }, []);

  useEffect(() => {
    const returnAPINationality = async (value) => {
      // créditos ao Gabriel Leite e Renata Domingues na solução do country retornando "All"
      if (country === 'All') { return; }
      const response = await getFoodNationalities(value);
      setNationality(response.map((e) => e));
    };
    returnAPINationality(country);
  }, [setNationality, country]);

  useEffect(() => {
    const setFoodsApi = async () => {
      const returnFoods = await requestApiAllFoods();
      setDrinksOrFood(returnFoods);
    };
    setFoodsApi();
  }, [setDrinksOrFood]);

  return (
    <div>
      <Header title="Explore Nationalities" />
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ ({ target }) => {
          setCountry(target.value);
        } }
      >
        <option
          data-testid="All-option"
        >
          All
        </option>
        {
          result.map((e) => (
            <option
              key={ e }
              data-testid={ `${e}-option` }
            >
              {e}
            </option>
          ))
        }
      </select>
      { (nationality.length > 0 && country !== 'All') && (
        nationality.slice(0, +'12').map((comida, index) => (
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
      {
        (drinksOrFood.length > 1 && country === 'All')
            && (drinksOrFood.slice(0, +'12').map((comida, index) => (
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
            )
      }
      <Footer />
    </div>
  );
}

export default ExploreFoodNationalities;
