import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import Main from './pages/Main';
import Header from './pages/Header';
import PostPage from './pages/PostPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/post" component={PostListPage} exact />
        <Route path="/post/:id" component={PostPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
