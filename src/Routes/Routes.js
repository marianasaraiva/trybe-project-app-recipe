import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DoneRecipes from '../pages/DoneRecipes';
import Drinks from '../pages/Drinks';
import DrinksDetails from '../pages/DrinksDetails';
import DrinksInProgres from '../pages/DrinksInProgres';
import Explore from '../pages/Explore';
import ExploreDrinkIngredients from '../pages/ExploreDrinkIngredients';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoodIngredients from '../pages/ExploreFoodIngredients';
import ExploreFoodNationalities from '../pages/ExploreFoodNationalities';
import ExploreDrinkNationalities from '../pages/ExploreDrinkNationalities';
import ExploreFoods from '../pages/ExploreFoods';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Foods from '../pages/Foods';
import FoodsDetails from '../pages/FoodsDetails';
import FoodsInProgress from '../pages/FoodsInProgress';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

const Routes = () => (
  <Switch>
    <Route path="/foods" component={ Foods } exact />
    <Route path="/foods/:id" component={ FoodsDetails } exact />
    <Route path="/drinks/:id" component={ DrinksDetails } exact />
    <Route path="/drinks" component={ Drinks } exact />
    <Route path="/foods/:id/in-progress" component={ FoodsInProgress } exact />
    <Route path="/drinks/:id/in-progress" component={ DrinksInProgres } exact />
    <Route path="/explore" component={ Explore } exact />
    <Route path="/explore/foods" component={ ExploreFoods } exact />
    <Route path="/explore/drinks" component={ ExploreDrinks } exact />
    <Route path="/explore/foods/ingredients" component={ ExploreFoodIngredients } exact />
    <Route path="/profile" component={ Profile } exact />
    <Route exact path="/" component={ Login } />
    <Route
      path="/explore/drinks/ingredients"
      component={ ExploreDrinkIngredients }
      exact
    />
    <Route
      path="/explore/foods/nationalities"
      component={ ExploreFoodNationalities }
      exact
    />
    <Route
      path="/explore/drinks/nationalities"
      component={ ExploreDrinkNationalities }
      exact
    />
    <Route path="/done-recipes" component={ DoneRecipes } exact />
    <Route path="/favorite-recipes" component={ FavoriteRecipes } exact />
  </Switch>
);

export default Routes;
