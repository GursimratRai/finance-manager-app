import { createStore, applyMiddleware } from "redux";

//thunk is a function that returns a function.
//Used to manage and start asynchronous actions.
//Return a function that accepts 'dispatch' so we can dispatch later
import thunk from "redux-thunk";

//Every time an action is dispatched,the new state is computed and saved
//logger is a middleware which helps in logging all actions and states after they are dispatched 
// import logger from "redux-logger";

//Used to manage state in an application
//reducers are the pure functions that takes the current state and action and return the new state and tell the store how to do
import reducer from "../reducers";

//configuring for using the redux store.
export function configureStore() {
  let store = createStore(reducer, applyMiddleware(thunk));
  return store;
}
