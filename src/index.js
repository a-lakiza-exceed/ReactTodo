import React from "react";
import jwt_decode from "jwt-decode";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import thunk from "redux-thunk";
import "./index.css";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import App from "./containers/App";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));

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
