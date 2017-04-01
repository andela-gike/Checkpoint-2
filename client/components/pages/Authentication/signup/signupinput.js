import React from 'react';
import { connect } from 'react-redux';
import classname from 'classnames';
import signupValidators from '../../../../../server/validation/signupvalidator';

class Signupinput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      confirmPass: '',
      roleId: 2,
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

    isValid() {
    const { errors, isValid } = signupValidators(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
      () => {},
      ({ data }) => this.setState({ errors: data, isLoading: false })
    );
      console.log(this.state);

    // if (this.isValid()) {
    //   this.setState({ errors: {}, isLoading: true });
    // }
    }
  }


  render() {
    const { errors } = this.state;

    return (
      <div className="row">
        <div className="col s12 m8 l4 offset-m2 offset-l4 z-depth-4 card-panel login-form">
          <form className="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <h4 className="center login-form-text">Create new acount</h4>
              </div>
            </div>
            <div className={classname('row margin', { 'has-error': errors.firstName })}>
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input
                  className="validate"
                  id="firstName"
                  type="text"
                  value={this.state.firstName}
                  onChange={this.onChange}
                />
                {errors.firstName && <span className="help-block">{errors.firstName}</span>}
                <label htmlFor="firstName" className="left-align">firstName</label>
              </div>
            </div>
            <div className={classname('row margin', { 'has-error': errors.lastName })}>
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input
                  className="validate"
                  id="lastName"
                  type="text"
                  value={this.state.lastName}
                  onChange={this.onChange}

                />
                <label htmlFor="lastName" className="left-align">lastName</label>
              </div>
              {errors.lastName && <span className="help-block">{errors.lastName}</span>}
            </div>
            <div className={classname('row margin', { 'has-error': errors.email })}>
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input
                  className="validate"
                  id="email"
                  type="text"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <label htmlFor="email" className="left-align">email</label>
                {errors.email && <span className="help-block">{errors.email}</span>}
              </div>
            </div>
            <div className={classname('row margin', { 'has-error': errors.userName })}>
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input
                  className="validate"
                  id="userName"
                  type="text"
                  value={this.state.userName}
                  onChange={this.onChange}
                />
                <label htmlFor="userName" className="left-align">userName</label>
              </div>
              {errors.userName && <span className="help-block">{errors.userName}</span>}
            </div>
            <div className={classname('row margin', { 'has-error': errors.password })}>
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input
                  className="validate"
                  id="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <label htmlFor="password" className="left-align">Password</label>
                {errors.password && <span className="help-block">{errors.password}</span>}
              </div>
            </div>
            <div className={classname('row margin', { 'has-error': errors.confirmPass })}>
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input
                  className="validate"
                  id="confirmPass"
                  type="password"
                  value={this.state.confirmPass}
                  onChange={this.onChange}
                />
                <label htmlFor="confirmPassword" className="left-align">Confirm Password</label>
              </div>
              {errors.confirmPass && <span className="help-block">{errors.confirmPass}</span>}
            </div>
            <div className="row margin role-select">
              <h6 className="left-align">Select role</h6>
              <select></select>
            </div>
            <div className="row">
              <div className="input-field col s12 signup-btn">
                <button className={'btn waves-effect waves-light col s12'} disabled={this.state.isLoading}>
                  Signup
                </button>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <p className="margin medium-small">Already a user? <a href="/login">Sign in!</a></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

}


Signupinput.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
};

// Signupinput.contextTypes = {
//   router: React.PropTypes.object.isRequired
// };

export default Signupinput;

