import * as types from '../actions/actionTypes';
import initialState from './initialState';

const userReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case types.CREATE_USER_SUCCESS:
      return Object.assign({}, state, action.user);
    case types.USER_SUCCESS:
      return Object.assign({}, state, action.users);
    case types.LOAD_USER_SUCCESS:
      return {};
    case types.UPDATE_USER_SUCCESS:
      return {};
    case types.CURRENT_USER:
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
