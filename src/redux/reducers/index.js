import { combineReducers } from 'redux';

import tableReducer from './tableReducer';
import authReducer from './authReducer';
export default combineReducers({
  
  table:tableReducer,
  auth:authReducer
});