import React, { propTypes } from 'react';
import RoleListRow from './RoleListRow';


const RoleList = ({ roles }) => (
  <table className=" striped bordered">
    <thead>
      <tr>
        <th>S/N</th>
        <th>Title</th>
        <th>Created At</th>
        <th>Updated At</th>
      </tr>
    </thead>
    <tbody>
    {roles.map(role =>
      <RoleListRow key={role.id} role={role} />
                )}
    </tbody>
  </table>
    );

export default RoleList;
