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
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export const history = createBrowserHistory();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(Thunk.withExtraArgument({ history })))
);

export const persistor = persistStore(store);

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Router>,
  document.getElementById('root')
);
