import React, { propTypes } from 'react';
import UserListRow from './UserListRow';
import { Modal, Row, Input, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { link } from 'react-router';
import * as UserAction from '../../../actions/userAction';


class UserList extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      roleId: ''
    };
  }

fieldChange(e) {
    return this.setState({ [e.target.name]: e.target.value, });
  }

deleteUser(id) {
    this.props.deleteUser(id);
  }

   onSubmit(e) {
    e.preventDefault();
    const { updateUser } = this.props;
    const { deleteUser } = this.props;
    const userId = e.target.id.value;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const userName = e.target.userName.value;
    const roleId = e.target.roleId.value;
    const userDetails = { userId, firstName, lastName, email, userName, roleId };
    updateUser(userDetails);
    deleteUser(userDetails);
  }

  renderRow (user, index) {
    return(
      <tr key={index}>
        <th>{index + 1}</th>
        <th>{user.firstName}</th>
        <th>{user.lastName}</th>
        <th>{user.email}</th>
        <th>{user.userName}</th>
        <th>{user.roleId}</th>
        <th>{user.createdAt}</th>
        <th>{user.updatedAt}</th>
        <Modal
          header="Edit User"
          trigger={
            <td><Button
              waves="light"
              className="btn-floating btn-medium right brown"
            >
            <i className="small material-icons">mode_edit</i></Button></td>
             }
        >
          <form className="col s12" method="post" onSubmit={e => this.onSubmit(e)} >
            <Row>
              <Input s={6} value="USER ID" />
              <Input s={6} name="id" value={user.id} />
            </Row>
            <Row>
              <Input
                s={6} label="firstName" name="firstName"
                value={this.state.firstName === '' ? user.firstName : this.state.firstName}
                onChange={e => this.fieldChange(e)}
              />
              <Input
                s={6} label="lastName" name="lastName"
                value={this.state.lastName === '' ? user.lastName : this.state.lastName}
                onChange={e => this.fieldChange(e)}
              />
            </Row>
            <Row>
              <Input
                s={6} label="userName" name="userName"
                value={this.state.userName === '' ? user.userName : this.state.userName}
                onChange={e => this.fieldChange(e)}
              />
              <Input
                s={6} label="email" name="email"
                value={this.state.email === '' ? user.email : this.state.email}
                onChange={e => this.fieldChange(e)}
              />
            </Row>
            <Row>
              <Input
                s={6} label="roleId" name="roleId"
                value={this.state.roleId === '' ? user.roleId : this.state.roleId}
                onChange={e => this.fieldChange(e)}
              />
            </Row>

            <Button className="blue darken-4" waves="light" type="submit">UPDATE</Button>
          </form>
        </Modal>
        <td> <Button
          waves="light" onClick={e => this.deleteUser(user.id)}
          className="btn-floating btn-small red darken-4 right"
        >
          <i className="small material-icons">delete</i></Button></td>
      </tr>
    )
  }
  render() {
    return(
      <table className="table striped">
      <thead>
        <tr>
          <th>s/n</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>User Name</th>
          <th>roleId</th>
        <th>createdAt</th>
        <th>updatedAt</th>

        </tr>
      </thead>
      <tbody>
        {this.props.users.map(this.renderRow)}
      </tbody>
    </table>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateUser: userDetails => dispatch(UserAction.updateUser(userDetails)),
  deleteUser: id => dispatch(UserAction.deleteUser(id))
});

const mapStateToProps = state => ({
  userDetails: state.user
});


export default connect(mapStateToProps, mapDispatchToProps)(UserList);
