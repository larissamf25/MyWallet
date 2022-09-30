import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

function App() {
  return (
    <div className="login-page">
      <Switch>
        <Route path="/MyWallet" exact><Login /></Route>
        <Route path="/MyWallet/carteira"><Wallet /></Route>
      </Switch>
      <footer className="footer">by Larissa Menezes, 2022</footer>
    </div>
  );
}

export default App;
