import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

const Drinks = () => {
  const { drinksOrFood } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if (drinksOrFood.length === 1) {
      history.push(`/drinks/${drinksOrFood[0].idDrink}`);
    }
  }, [drinksOrFood, history]);

  return (
    <div>
      <Header title="Drinks" />
      <Footer />
    </div>
  );
};

export default Drinks;
