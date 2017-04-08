import { combineReducers } from 'redux';
import documents from './documentReducer';
import roles from './roleReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  roles,
  user,
  documents
});
export default rootReducer;
