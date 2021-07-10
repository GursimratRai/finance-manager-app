import { combineReducers } from "redux";
import auth from './auth';
import income from './income';
import expense from './expense';

//used to combine many reducers.
export default combineReducers({
  auth,
  income,
  expense    
})