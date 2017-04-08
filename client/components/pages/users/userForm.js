import React from 'react';
import TextInput from '../../TextInput';

const UserForm = ({ user, onSave, onChange, loading, errors }) => (
  <div className="row">
    <br />
    <br />
    <br />
    <div className="col s12 m8 l4 offset-m2 offset-l4 z-depth-4 card-panel login-form row">
      <form method="POST" className="row">
        <center>
          <h4 className="">Create account</h4>
        </center>
        <br />
        <br />
        <TextInput
          name="firstName"
          label="firstName"
          defaultvalue={user.firstName}
          onChange={onChange}
          error={errors}
        />

        <TextInput
          name="lastName"
          label="lastName"
          defaultvalue={user.lastName}
          onChange={onChange}
          error={errors}
        />

        <TextInput
          name="email"
          label="email"
          defaultvalue={user.email}
          onChange={onChange}
          error={errors}
        />

        <TextInput
          name="username"
          label="username"
          defaultvalue={user.userName}
          onChange={onChange}
          error={errors}
        />


        <TextInput
          name="password"
          label="password"
          defaultvalue={user.password}
          onChange={onChange}
          error={errors}
        />


        <TextInput
          name="roleId"
          label="role"
          defaultvalue={user.roleId}
          onChange={onChange}
          error={errors}
        />
        <center>
        <a
          disabled={loading}
          value={loading ? 'saving ...' : 'save'}
          className="btn wave-light"
          onClick={onSave}
        > SignUp </a></center>
      </form>
    </div>
  </div>
	);

export default UserForm;
