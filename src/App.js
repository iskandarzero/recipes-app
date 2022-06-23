import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RecipesProvider } from './context/RecipesContext';

import Login from './pages/Login';
import Foods from './pages/Foods';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import Recipe from './pages/Recipe';
import InProgress from './pages/InProgress';
import DoneRecipes from './pages/DoneRecipes';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/foods/:id" component={ Recipe } />
        <Route exact path="/drinks/:id" component={ Recipe } />
        <Route path="/foods/:id/in-progress" component={ InProgress } />
        <Route path="/drinks/:id/in-progress" component={ InProgress } />
        <Route path="/done-recipes" component={ DoneRecipes } />
      </Switch>
    </RecipesProvider>

  );
}

export default App;
