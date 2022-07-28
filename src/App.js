import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact><Login /></Route>
        <Route path="/carteira"><Wallet /></Route>
      </Switch>
    </div>
  );
}

export default App;
