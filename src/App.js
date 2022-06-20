import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Foods from './pages/Foods';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/profile" component={ Profile } />
      <Route path="/foods/:id-da-receita" render={ () => <RecipeDetails /> } />
    </Switch>
  );
}

export default App;
