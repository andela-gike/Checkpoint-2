import React from 'react';
import { Route, IndexRoute , match } from 'react-router';
import App from './containers/App';
import LandingPage from './components/pages/LandingPages/LandingPage';
import Header from './components/Header';
import Login from './components/pages/Authentication/Login';
import Register from './components/pages/Authentication/SignUp';
import RolePage from './containers/RolePage';
import ManageRolePage from './containers/ManageRolePage';
import UserPage from './containers/UserPage';
import ManageUserPage from './containers/ManageUserPage';
import DocumentContainer from '../client/containers/DocumentContainer';
import DocumentPage from '../client/containers/DocumentPage';

const logUserOut = (nextState, replace, done) => {
  localStorage.removeItem('dms-user');
  window.location = '/';
};

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="signup" component={Register}/>
    <Route path="login" component={Login}/>
    <Route path="roles" component={RolePage} />
    <Route path="createdoc" component={DocumentContainer} />
    <Route path="role" component={ManageRolePage} />
    <Route path="role/:id" component={ManageRolePage} />
    <Route path="register" component={UserPage} />
    <Route path="signups" component={ManageUserPage} />
    <Route path="user" component={ManageUserPage} />
    <Route path="logout" onEnter={logUserOut} />
    <Route path="documents" component={DocumentPage} />
    <Route path="documents/:id" component={DocumentContainer} />
  </Route>
);


