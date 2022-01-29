import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DoneRecipes from '../pages/DoneRecipes';
import Drinks from '../pages/Drinks';
// import DrinksDetails from '../pages/DrinksDetails';
import DrinksInProgres from '../pages/DrinksInProgres';
import Explore from '../pages/Explore';
import ExploreDrinkIngredients from '../pages/ExploreDrinkIngredients';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoodIngredients from '../pages/ExploreFoodIngredients';
import ExploreFoodNationalities from '../pages/ExploreFoodNationalities';
import ExploreFoods from '../pages/ExploreFoods';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Foods from '../pages/Foods';
// import FoodsDetails from '../pages/FoodsDetails';
import FoodsInProgress from '../pages/FoodsInProgress';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/foods" component={ Foods } />
    {/* <Route exact path="/foods/:id" component={ FoodsDetails } /> */}
    <Route exact path="/profile" component={ Profile } />
    <Route exact path="/drinks" component={ Drinks } />
    {/* <Route exact path="/drinks/:id" component={ DrinksDetails } /> */}
    <Route exact path="/foods/:id/in-progress" component={ FoodsInProgress } />
    <Route exact path="/drinks/:id/in-progress" component={ DrinksInProgres } />
    <Route exact path="/explore" component={ Explore } />
    <Route exact path="/explore/foods" component={ ExploreFoods } />
    <Route exact path="/explore/drinks" component={ ExploreDrinks } />
    <Route exact path="/explore/foods/ingredients" component={ ExploreFoodIngredients } />
    <Route
      exact
      path="/explore/drinks/ingredients"
      component={ ExploreDrinkIngredients }
    />
    <Route
      exact
      path="/explore/foods/nationalities"
      component={ ExploreFoodNationalities }
    />
    <Route exact path="/done-recipes" component={ DoneRecipes } />
    <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
  </Switch>
);

export default Routes;
