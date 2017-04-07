import request from 'superagent';
import * as types from './actionTypes';


export const createRole = role => ({
  type: types.CREATE_ROLE,
  role
});


// action creators
export const getRoleSuccess = roles => ({
  type: types.LOAD_ROLE_SUCCESS,
  roles
});

export const updateRoleSuccess = role => ({
  type: types.UPDATE_ROLE_SUCCESS,
  role
});


export const createRoleSuccess = role => ({
  type: types.CREATE_ROLE_SUCCESS,
  role
});

// thunk
export const roleSaver = (role) => {
  return (dispatch) => {
    const token = localStorage.getItem('dms-user');
    request
    .post('/api/roles')
    .send(role)
    .set({ 'x-access-token': token })
    .end((err, res) => {
      Materialize.toast(res.body.message, 4000, 'rounded');
      dispatch(createRoleSuccess(role));
      window.location = '/roles';
      return res;
    });
  };
};

export const fetchRoles = () => {
  return (dispatch) => {
    const token = localStorage.getItem('dms-user');
    request
    .get('/api/roles')
    .set({ 'x-access-token': token })
    .end((err, res) => {
      Materialize.toast(res.body.message, 4000, 'rounded');
      dispatch(getRoleSuccess(res.body.roles));
    });
  };
};

