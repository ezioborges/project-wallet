import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import Edit from './pages/Edit';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/wallet" component={ Wallet } />
          <Route exact path="/edit/:id" component={ Edit } />
        </Switch>
      </div>
    );
  }
}

export default App;
