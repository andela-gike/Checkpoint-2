import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/pages/Landingpage/Homepage';
import AboutPage from './components/pages/Landingpage/Aboutpage';
import LoginPage from './components/pages/Authentication/Login';
import SignUpPage from './components/pages/Authentication/Signup';
import Dashboard from './components/pages/Dashboard/Dashboard';

export default (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="dashboard" component={Dashboard} />
      <Route path="about" component={AboutPage} />
      <Route path="login" component={LoginPage} />
      <Route path="signup" component={SignUpPage} />
    </Route>
);

