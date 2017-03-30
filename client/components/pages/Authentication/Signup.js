import React from 'react';

class Signup extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 m8 l4 offset-m2 offset-l4 z-depth-4 card-panel login-form">
          <form className="col s12" onSubmit={this.handleSubmit}>
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
                  value={this.state.userInfo.firstname}
                  onChange={event => this.handleInputChange(event, 'firstname')}
                />
                <label htmlFor="firstname" className="left-align">Firstname</label>
              </div>
              { this.displayValidationErrors('firstname') }
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input
                  id="lastname"
                  type="text"
                  value={this.state.userInfo.lastname}
                  onChange={event => this.handleInputChange(event, 'lastname')}
                />
                <label htmlFor="lastname" className="left-align">lastname</label>
              </div>
              { this.displayValidationErrors('lastname') }
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input
                  id="username"
                  type="text"
                  value={this.state.userInfo.username}
                  onChange={event => this.handleInputChange(event, 'username')}
                />
                <label htmlFor="username" className="left-align">Username</label>
              </div>
              { this.displayValidationErrors('username') }
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input
                  id="password"
                  type="password"
                  value={this.state.userInfo.password}
                  onChange={event => this.handleInputChange(event, 'password')}
                />
                <label htmlFor="password" className="left-align">Password</label>
              </div>
              { this.displayValidationErrors('password') }
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input
                  id="confirm"
                  type="password"
                  value={this.state.userInfo.confirmPass}
                  onChange={event => this.handleInputChange(event, 'confirmPass')}
                />
                <label htmlFor="confirm" className="left-align">Confirm password</label>
              </div>
              { this.displayValidationErrors('confirmPass') }
            </div>
            <div className="row margin role-select">
              <h6 className="left-align">Select role</h6>
              <Select
                className="select"
                name="form-field-name"
                value={this.state.userInfo.role}
                options={this.state.roles}
                onChange={this.handleRolesChange}
              />
            </div>
            { this.displayAsyncFeedback() }
            <div className="row">
              <div className="input-field col s12 signup-btn">
                <button className={`btn waves-effect waves-light col s12 ${this.isFormValid() ? '' : 'disabled'}`}>
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
