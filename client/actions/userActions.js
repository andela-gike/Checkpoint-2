import axios from 'axios';
import * as types from './actionTypes';

/**
 * action to successfully get a user
 * @export
 * @param {any} users
 * @returns  {object} user
 */
export function retrieveUsersSuccess(users) {
  return {
    type: types.RETRIEVE_USERS_SUCCESS,
    users
  };
}

export function updateUserSuccess(user) {
  return {
    type: types.UPDATE_USER_SUCCESS,
    user
  };
}

export function getUserInfoSuccess(user) {
  return {
    type: types.GET_USER_INFO_SUCCESS,
    user
  };
}

/**
 * dispatching the action to get users
 * @export
 * @returns {object}
 */
export function retrieveUsers() {
  return dispatch => axios.get('/api/users')
    .then((response) => {
      dispatch(retrieveUsersSuccess(response.data.usersFound));
      console.log('<<<<<<<<', response.data.usersFound);
    }).catch((error) => {
      throw (error);
    });
}

/**
 * dispatching the action to get users
 * @param {any} id
 * @export
 * @returns {object}
 */
export function deleteUser(id) {
  return dispatch => axios.delete(`/api/users/${id}`)
    .then(() => {
      dispatch(retrieveUsers());
    }).catch((error) => {
      throw (error);
    });
}

/**
 * dispatching the action to update a user details
 * @export
 * @param {any} user
 * @returns {object}
 */
export function updateUserAdmin(user) {
  return dispatch => axios.put(`/api/users/${user.id}`, user)
      .then(() => {
        dispatch(retrieveUsers());
      }).catch((error) => {
        throw (error);
      });
}

export function updateUserInfo(userInfo) {
  const user = JSON.parse(localStorage.getItem('user'));
  return dispatch => axios.put(`/api/users/${user.userId}`, userInfo)
    .then((response) => {
      console.log(response, 'response');
      dispatch(updateUserSuccess(userInfo));
      console.log(userInfo);
    }).catch((error) => {
      throw error;
    });
}

export function getUserInfo() {
  const user = JSON.parse(localStorage.getItem('user'));
  return dispatch => axios.get(`/api/users/${user.userId}`)
    .then((response) => {
      dispatch(getUserInfoSuccess(response.data));
      console.log(response.data);
    }).catch((error) => {
      throw error;
    });
}

