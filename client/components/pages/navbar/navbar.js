import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../../actions/loginActions';

class Navbar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="navbar navbar-light brown darken-2 right hide-on-med-and-down">
        <li><Link to="/dashboard" activeClassName="active">Dashboard</Link></li>
        <li><Link to="/documents" activeClassName="active">Documents</Link></li>
        <li><a href="#" onClick={this.logout.bind(this)}>LogOut</a></li>
      </ul>
    );

    const guestLinks = (
      <ul className="right hide-on-med-and-down navbar navbar-light brown darken-2">
        <li><Link to="/signup" activeClassName="active">Sign up</Link></li>
        <li><Link to="/login" activeClassName="active">Login</Link></li>
      </ul>
    );

    return (
      <nav className="navbar navbar-light brown darken-2">
        <div className="navbar-wrapper">
          <IndexLink to="/" activeClassName="active">Home</IndexLink>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/about" activeClassName="active">About</Link></li>
            <li><Link to="/documents" activeClassName="active">Documents</Link></li>
          </ul>
        </div>
        <div className="navbar-wrapper">
          { isAuthenticated ? userLinks : guestLinks }
        </div>
      </nav>
    );
  }
}

Navbar.PropTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(Navbar);
