import axios from 'axios';
import * as types from './actionTypes';

/**
 * action to successfully load a role from state
 * @param  {object} role
 * @return {object}
 */
export function loadRoleSuccess(roles) {
  return {
    type: types.LOAD_ROLE_SUCCESS,
    roles
  };
}

/**
 * load roles
 * @return {object}
 */
export function loadRoles() {
  return dispatch => axios.get('/api/roles')
    .then((response) => {
      dispatch(loadRoleSuccess(response.data)
      );
    }).catch((error) => {
      throw (error);
    });
}

/**
 * save new role
 * @param  {object} role
 * @return {object}
 */
export function saveRole(role) {
  return dispatch => axios.post('/api/roles', role)
    .then(() => {
      dispatch(loadRoles());
    }).catch((error) => {
      throw (error);
    });
}

/**
 * @param  {object} role
 * @return {function}
 */
export function updateRole(role) {
  return dispatch => axios.put(`/api/roles/${role.id}`, role)
    .then(() => {
      dispatch(loadRoles());
    }).catch((error) => {
      throw (error);
    });
}

/**
 * delete role from db
 * @param  {number} id
 * @return {object}
 */
export function deleteRole(id) {
  return dispatch => axios.delete(`/api/roles/${id}`)
    .then(() => {
      dispatch(loadRoles());
    }).catch((error) => {
      throw (error);
    });
}
