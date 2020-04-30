import React from "react";
import jwt_decode from "jwt-decode";
import ReactDOM from "react-dom";
import queryString from "query-string";
import { Provider } from "react-redux";
import * as serviceWorker from "serviceWorker";
import App from "containers/App";
import setAuthToken from "utils/setAuthToken";
import store from 'redux/store/index'
import { setCurrentUser, logoutUser } from "redux/actions/authActions";
import "index.css";

const query = queryString.parse(window.location.search);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

if (query.token) {
  localStorage.setItem("jwtToken", query.token);
}

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

serviceWorker.unregister();
