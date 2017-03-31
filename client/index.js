import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import routes from './routes';
// import store from './store';

injectTapEventPlugin();

const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);

render(
  <Provider store={store}>
  <Router history={browserHistory} routes={routes} /></Provider>,
    document.getElementById('container')
);
