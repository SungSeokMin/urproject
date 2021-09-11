import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import Main from './pages/Main';
import Header from './pages/Header';
import PostPage from './pages/PostPage';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/post" component={PostListPage} exact />
        <Route path="/post/:id" component={PostPage} />
      </Switch>
    </div>
  );
}

export default App;
