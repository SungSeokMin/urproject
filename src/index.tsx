import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(Thunk.withExtraArgument({ history })))
);

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
