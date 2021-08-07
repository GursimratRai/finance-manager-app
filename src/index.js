import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

//css for styling.
import "./index.css";

//importing App component from components folder.
import App from "./components/App";

//Connecting redux store.
import { configureStore } from "./store";
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
