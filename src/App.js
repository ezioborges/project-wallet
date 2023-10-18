import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/wallet" component={ Wallet } />
        </Switch>
      </div>
    );
  }
}

export default App;
