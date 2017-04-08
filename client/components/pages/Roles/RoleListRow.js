import React, { propTypes } from 'react';
import { Button } from 'react-materialize';

const RoleListRow = ({ role }) => {
  return(
  <tr>
    <td>{role.id}</td>
    <td>{role.title}</td>
    <td>{role.createdAt}</td>
    <td>{role.updatedAt}</td>
    <td><Button waves="light" className="btn btn-medium right brown">
      <i className="small material-icons ">mode_edit</i></Button></td>
    <td><Button waves="light" className="btn btn-medium right red darken-4">
      <i className="small material-icons">delete</i></Button></td>
  </tr>
  );
};

export default RoleListRow;
