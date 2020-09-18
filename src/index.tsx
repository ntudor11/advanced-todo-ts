import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunkMiddleWare from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { appReducer } from "./reducers/appReducer";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// let devTools = window.__REDUX_DEVTOOLS_EXTENSION__
//   ? window.__REDUX_DEVTOOLS_EXTENSION__()
//   : (a: any) => a;
// if (process.env.NODE_ENV === "production") {
//   devTools = (a: any) => a;
// }

const store = createStore(
  appReducer,
  compose(applyMiddleware(thunkMiddleWare))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
