import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 m8 l4 offset-m2 offset-l4 z-depth-4 card-panel login-form">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <h4 className="center login-form-text">Sign into your account</h4>
              </div>
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input
                  id="username"
                  type="text"
                />
                <label htmlFor="username" className="left-align">username</label>
              </div>
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input
                  id="password"
                  type="password"
                />
                <label htmlFor="password" className="left-align">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 signup-btn">
                <button className={'btn waves-effect waves-light col s12 '}>
                  Login
                </button>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6 m6 l6">
                <p className="margin medium-small">New user? <a href="/#/signup">Register Now!</a></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
