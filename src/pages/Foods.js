import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';

const Foods = () => {
  const { drinksOrFood } = useContext(Context);
  const history = useHistory();
  console.log(drinksOrFood);

  useEffect(() => {
    if (drinksOrFood.length === 1) {
      history.push(`/foods/${drinksOrFood[0].idMeal}`);
    }
  }, [drinksOrFood, history]);

  return (
    <div>
      <Header title="Foods" />
      <Footer />
    </div>
  );
};

export default Foods;
