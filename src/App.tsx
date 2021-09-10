import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Board from './pages/Board';
import Main from './pages/Main';
import Header from './pages/Header';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/board" component={Board} />
      </Switch>
    </div>
  );
}

export default App;
