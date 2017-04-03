import axios from 'axios';

export function userSignupRequest(userData) {
  return (dispatch) => {
    return axios.post('/api/users', userData)
    .then(response => {
      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
    });
  };
}

export function isUserExists(userExists) {
  return (dispatch) => axios.get(`/api/users/${userExists}`);
}
