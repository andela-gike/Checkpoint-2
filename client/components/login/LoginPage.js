import React from 'react';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {
  render() {
    return (
      <div className="card" id="logincard">
        <br />
        <center><h4>SIGN INTO YOUR ACCOUNT</h4></center>
         <br />
        <br />
        <LoginForm />
      </div>
    );
  }
}

export default LoginPage;
