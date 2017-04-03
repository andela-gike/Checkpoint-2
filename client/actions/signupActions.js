import axios from 'axios';

export function userSignupRequest(userData) {
  return (dispatch) => {
    return axios.post('/api/users', userData);
  };
}

export function isUserExists(userExists) {
  return (dispatch) => axios.get(`/api/users/${userExists}`);
}
