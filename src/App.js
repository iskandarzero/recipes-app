import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Foods from './pages/Foods';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/profile" component={ Profile } />
    </Switch>
  );
}

export default App;
