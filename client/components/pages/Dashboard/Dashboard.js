import React, { Component } from 'react';

import MainNav from './topNavDash';
import SideNav from './sideNavDash';

export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      sideNav: {
        visible: false,
      },
    };

    // Correctly Bind class methods to reacts class instance
    this.toggleSideNav = this.toggleSideNav.bind(this);
    this.renderSideNav = this.renderSideNav.bind(this);
  }

  toggleSideNav(navState) {
    const newState = this.state;
    newState.sideNav.visible = navState || !newState.sideNav.visible;
    this.setState(newState);
  }

  renderSideNav() {
    return this.state.sideNav.visible ? <SideNav toggleSideNav={this.toggleSideNav} /> : '';
  }

  render() {
    return (
      <div>
        <MainNav toggleSideNav={this.toggleSideNav} />
        { this.renderSideNav() }
        { this.props.children }
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: React.PropTypes.node,
};
