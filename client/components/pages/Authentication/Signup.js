import React from 'react';

class Signup extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 m8 l4 offset-m2 offset-l4 z-depth-4 card-panel login-form">
          <form className="col s12" >
            <div className="row">
              <div className="input-field col s12">
                <h4 className="center login-form-text">Create new acount</h4>
              </div>
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input
                  id="firstname"
                  type="text"
                />
                <label htmlFor="firstname" className="left-align">Firstname</label>
              </div>
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input
                  id="lastname"
                  type="text"
                />
                <label htmlFor="lastname" className="left-align">lastname</label>
              </div>
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input
                  id="username"
                  type="text"
                />
                <label htmlFor="username" className="left-align">email</label>
              </div>
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input
                  id="username"
                  type="text"
                />
                <label htmlFor="username" className="left-align">Username</label>
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
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input
                  id="confirm"
                  type="password"
                />
                <label htmlFor="confirm" className="left-align">Confirm password</label>
              </div>
            </div>
            <div className="row margin role-select">
              <h6 className="left-align">Select role</h6>

            </div>
            <div className="row">
              <div className="input-field col s12 signup-btn">
                <button className={'btn waves-effect waves-light col s12'}>
                  Signup
                </button>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <p className="margin medium-small">Already a user? <a href="/#/signin">Sign in!</a></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Signup;
