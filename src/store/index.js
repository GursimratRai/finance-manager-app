import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import logger from "redux-logger";

import reducer from "../reducers";

//configuring for using the redux store.
export function configureStore() {
  let store = createStore(reducer, applyMiddleware(thunk, logger));
  return store;
}
