import React from 'react';
import LoginInput from './logininput';

class LoginPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className=" col s12">
          <LoginInput />
        </div>
      </div>
    );
  }
}

export default LoginPage;
