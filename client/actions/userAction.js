import request from 'superagent';
import * as types from './actionTypes';

export const createUser = user => ({
  type: types.CREATE_USER,
  user
});

export const getUserSuccess = users => ({
  type: types.USER_SUCCESS,
  users
});

export const createUserSuccess = user => ({
  type: types.CREATE_USER_SUCCESS,
  user
});

export const updateUserSuccess = user => ({
  type: types.UPDATE_USER_SUCCESS,
  user
});


export const deleteUserSuccess = user => ({
  type: types.DELETE_USER_SUCCESS,
  user
});


export const saveUser = user => (dispatch) => {
  request
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        Materialize.toast(res.body.message, 4000, 'rounded');
        if (err) {
          return err;
        }
        dispatch(createUserSuccess(user));
        window.location = '/login';
      });
};

export const fetchUsers = () => {
  const token = localStorage.getItem('dms-user');
  return (dispatch) => {
    request
  .get('/api/users')
  .set({ 'x-access-token': token })
  .end((err, res) => {
    Materialize.toast(res.body.message, 4000, 'rounded');
    dispatch(getUserSuccess(res.body.data));
  });
  };
};

export const login = userCredentials => () => {
  request
    .post('/api/users/login')
    .send(userCredentials)
    .end((err, res) => {
      Materialize.toast(res.body.message, 4000, 'rounded');
      if (err) {
        return err;
      }
      const createdUser = Object.assign({}, res.body.user, { token: res.body.token });
      localStorage.setItem('dms-user', res.body.token);
      window.location = '/';
    });
};


export const updateUser = (user) => {
  const token = localStorage.getItem('dms-user');
  return (dispatch) => {
    request
  .put(`/api/users/${user.userId}`)
  .set({ 'x-access-token': token })
  .send(user)
  .end((err, res) => {
    Materialize.toast(res.body.message, 4000, 'rounded');
    if (err) {
      return err;
    }
    window.location = '/register';
    dispatch(updateUserSuccess(res.body.user));
  });
  };
};


export const deleteUser = (id) => {
  const token = localStorage.getItem('dms-user');
  return (dispatch) => {
    request
  .delete(`/api/users/${id}`)
  .send(document)
  .set({ 'x-access-token': token })
  .end((err, res) => {
    Materialize.toast(res.body.message, 4000, 'rounded');
    if (err) {
      return err;
    }
    dispatch(deleteUserSuccess(res.body.document));
    window.location = '/register';
  });
  };
};
