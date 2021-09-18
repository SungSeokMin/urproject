import React, { useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import Main from './pages/main/Main';
import Header from './pages/Header';
import PostPage from './pages/PostPage';
import NotFound from './pages/NotFound';
import WritePage from './pages/WritePage';

function App() {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const showLoginModal = () => {
    setSignIn(true);
    setSignUp(false);
  };

  const showSignUpModal = () => {
    setSignIn(false);
    setSignUp(true);
  };

  const notShow = () => {
    setSignIn(false);
    setSignUp(false);
  };

  return (
    <div className="app-container">
      <div className="inner-container">
        <Header
          signIn={signIn}
          signUp={signUp}
          showLoginModal={showLoginModal}
          showSignUpModal={showSignUpModal}
          notShow={notShow}
        />
        <Switch>
          <Route
            path="/"
            render={() => <Main showSignUpModal={showSignUpModal} />}
            exact
          />
          <Route path="/post" component={PostListPage} exact />
          <Route path="/post/:id" component={PostPage} exact />
          <Route path="/post/modify/:id" component={WritePage} />
          <Route path="/write" component={WritePage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
