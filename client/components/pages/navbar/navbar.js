import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Navbar = () => {
  return (
    <nav className="navbar navbar-light brown darken-2">
      <div className="navbar-wrapper">
        <IndexLink to="/" activeClassName="active">Home</IndexLink>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/about" activeClassName="active">About</Link></li>
          <li><Link to="/dashboard" activeClassName="active">Dashboard</Link></li>
          <li><Link to="/documents" activeClassName="active">Documents</Link></li>
          <li><Link to="/signup" activeClassName="active">Sign up</Link></li>
          <li><Link to="/login" activeClassName="active">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
