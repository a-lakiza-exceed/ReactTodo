import { createAction } from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import setAuthToken from "utils/setAuthToken";
import {
  register,
  login
} from 'utils/API'
import { SET_CURRENT_USER } from "redux/types/actionTypes";

export const setCurrentUser = createAction(SET_CURRENT_USER)

export const registerUser = (userData, history) => dispatch => {
  register(userData)
    .then(res => history.push("/login"))
    .catch(err => {
      toast.error(`${err.response.data.name}`)
    }
    );
};

export const loginUser = userData => dispatch => {
  login(userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser({ decoded }));
    })
    .catch(err => {
      toast.error(`${err.response.data.emailnotfound}`)
    }
    );
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};