import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Foods from '../pages/Foods';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route path="/foods" component={ Foods } />
    <Route path="/profile" component={ Profile } />
    {/* <Route path="/drinks" component={  } />
    <Route path="/foods/{id-da-receita}" component={  } />
    <Route path="/drinks/{id-da-receita}" component={  } />
    <Route path="/foods/{id-da-receita}/in-progress" component={  } />
    <Route path="/drinks/{id-da-receita}/in-progress" component={  } />
    <Route path="/explore" component={  } />
    <Route path="/explore/foods" component={  } />
    <Route path="/explore/drinks" component={  } />
    <Route path="/explore/foods/ingredients" component={  } />
    <Route path="/explore/drinks/ingredients" component={  } />
    <Route path="/explore/foods/nationalities" component={  } />
    <Route path="/done-recipes" component={  } />
    <Route path="/favorite-recipes" component={  } /> */}
  </Switch>
);

export default Routes;
