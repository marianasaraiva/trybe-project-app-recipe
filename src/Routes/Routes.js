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
import ExploreFoods from '../pages/ExploreFoods';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Foods from '../pages/Foods';
import FoodsDetails from '../pages/FoodsDetails';
import FoodsInProgress from '../pages/FoodsInProgress';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

const Routes = () => (
  <Switch>
    <Route path="/foods" component={ Foods } />
    <Route path="/foods/:id" component={ FoodsDetails } />
    <Route path="/drinks/:id" component={ DrinksDetails } />
    <Route path="/drinks" component={ Drinks } />
    <Route path="/foods/:id/in-progress" component={ FoodsInProgress } />
    <Route path="/drinks/:id/in-progress" component={ DrinksInProgres } />
    <Route path="/explore" component={ Explore } />
    <Route path="/explore/foods" component={ ExploreFoods } />
    <Route path="/explore/drinks" component={ ExploreDrinks } />
    <Route path="/explore/foods/ingredients" component={ ExploreFoodIngredients } />
    <Route path="/profile" component={ Profile } />
    <Route
      path="/explore/drinks/ingredients"
      component={ ExploreDrinkIngredients }
    />
    <Route
      path="/explore/foods/nationalities"
      component={ ExploreFoodNationalities }
    />
    <Route path="/done-recipes" component={ DoneRecipes } />
    <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    <Route exact path="/" component={ Login } />
  </Switch>
);

export default Routes;
