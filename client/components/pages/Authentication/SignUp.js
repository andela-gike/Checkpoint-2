import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../../actions/userAction';


const Register = (props) => {
  const { saveUser } = props;
  const onSubmit = (e) => {
    e.preventDefault();
    const firstName = e.target.firstname.value;
    const lastName = e.target.lastname.value;
    const email = e.target.email.value;
    const userName = e.target.username.value;
    const password = e.target.password.value;
    const user = { firstName, userName, lastName, email, password };
    saveUser(user);
  };
  return (<main>
    <center>


        <div className="row">
          <div className="col s12 m8 l4 offset-m2 offset-l4 z-depth-4 card-panel login-form row">

            <form className="col s12" method="post" onSubmit={onSubmit}>
              <div className="row" />
              <h4 className="center login-form-text">Create a new account</h4>
              <div className="row" />
              <div className="row">
                <div className="col s12" />
              </div>

              <div className="row">
                <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                  <input className="validate" type="text" name="firstname" id="firstname" />
                <label htmlFor="email">Enter your firstname</label>
                </div>
              </div>


              <div className="row">
                <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                  <input className="validate" type="text" name="lastname" id="lastname" />
                  <label htmlFor="email">Enter your lastname</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                  <input className="validate" type="email" name="email" id="email" />
                  <label htmlFor="email" htmlFor="email" data-error="wrong" data-success="right">Enter your email</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                  <input className="validate" type="text" name="username" id="username" />
                  <label htmlFor="username">Enter your username</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>

                  <input className="validate" type="password" name="password" id="password" />
                  <label htmlFor="password" data-error="wrong" data-success="right" htmlFor="password">Enter your password</label>
                </div>

              </div>
              <div className="row">
                <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>

                  <input className="validate" type="password" name="password" id="confirmPassword" />
                  <label htmlFor="confirmPassword" data-error="wrong" data-success="right" htmlFor="password">confirmPassword</label>
                </div>

              </div>

              <br />
              <center>
                <div className="row">
                  <button type="submit" name="btn_login" className="btn waves-effect waves-light col s12">Signup</button>
                </div>
              </center>
            </form>
          </div>
        </div>
        Already a user? <a href="/login">Login</a>
      </center>

    <div className="section" />
    <div className="section" />
  </main>
  );
};
// we map our dispatch to custom saveUser props
const mapDispatchToProps = dispatch => ({
  saveUser: user => dispatch(userActions.saveUser(user))
});

const mapStateToProps = (state) => ({
    user: state.user
  });

export default connect(mapStateToProps, mapDispatchToProps)(Register);
