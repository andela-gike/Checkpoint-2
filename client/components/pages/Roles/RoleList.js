import React, { propTypes } from 'react';
import RoleListRow from './RoleListRow';


const RoleList = ({ roles }) => (
  <table className="striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Created At</th>
        <th>Updated At</th>
      </tr>
    </thead>
    {roles.map(role =>
      <RoleListRow key={role.id} role={role} />
                )}
    <tbody />
  </table>
    );

export default RoleList;
