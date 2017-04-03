import React from 'react';
import classname from 'classnames';
import { connect } from 'react-redux';
import loginValidator from '../../../../../server/validation/loginvalidator';
import { login } from '../../../../actions/loginActions';

class LoginInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
    const { errors, isValid } = loginValidator(this.state);

    if (!isValid) {
      return this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        res => this.context.router.push('/'),
        err => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="row">
        <div className="col s12 m8 l4 offset-m2 offset-l4 z-depth-4 card-panel login-form">
          <form className="col s12 center-align" id="loginform" onSubmit={this.onSubmit}>
            {errors.form && <div className="card-alert">{errors.form}</div>}
            <div className="row">
              <div className="input-field col s12">
                <h4 className="center login-form-text">Sign into your account</h4>
              </div>
            </div>
            <div className={classname('row margin', { 'has-error': errors.password })}>
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
            <div className="row">
              <div className="input-field col s12 signup-btn">
                <button
                  className={'btn waves-effect waves-light col s12'}
                  disabled={this.state.isLoading}>
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

LoginInput.propTypes = {
  login: React.PropTypes.func.isRequired,
};

LoginInput.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(null, { login })(LoginInput);

