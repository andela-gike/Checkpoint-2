import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LodashMap from 'lodash/map';
import { browserHistory } from 'react-router';
import * as userActions from '../actions/userAction';
import UserList from '../components/pages/users/UserList';


class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.redirectToRolePage = this.redirectToRolePage.bind(this);
  }

  redirectToRolePage() {
    browserHistory.push('/user');
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { users } = this.props;
      if(users) {
        const usersInArray = LodashMap(users, (value) => value);
        return(
          <div>
          <UserList users={usersInArray}/>
          <input
          type="submit"
          value="Add a new User"
          className="btn waves-effect waves-light"
          onClick={this.redirectToRolePage}
        />
          </div>
        )
      }

      return(
        <div>
        No users
        </div>
      )
  }
}

User.PropTypes = {
  users: PropTypes.array.isRequired
};


// we map our dispatch to custom saveUser props
const mapDispatchToProps = dispatch => ({
  saveUser: user => dispatch(userActions.saveUser(user)),
  fetchUsers: () => dispatch(userActions.fetchUsers())
});

const mapStateToProps = state => ({
  users: state.user
});
export default connect(mapStateToProps, mapDispatchToProps)(User);
