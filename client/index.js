import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import jwt from 'jsonwebtoken';
import routes from './routes';
import rootReducer from './reducers/rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/loginActions';

injectTapEventPlugin();

const store = createStore(
  rootReducer,
  compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage)));
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} /></Provider>,
    document.getElementById('container')
);
