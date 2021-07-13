import { combineReducers } from "redux";
import auth from './auth';
import transaction from './transaction';

//used to combine many reducers.
export default combineReducers({
  auth,
  transaction    
})