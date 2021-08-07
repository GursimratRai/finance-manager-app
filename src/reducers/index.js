import { combineReducers } from "redux";
import auth from './auth';
import transaction from './transaction';

//Combining all the Reducers.
export default combineReducers({
  auth,
  transaction    
})