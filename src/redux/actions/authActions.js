import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import {
  SET_CURRENT_USER,
  USER_LOADING
} from "../types/actionTypes";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:2000/user/register/", userData)
    .then(res => history.push("/login"))
    .catch(err => {
      toast.error(`${err.response.data.name}`)
      }
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post("http://localhost:2000/user/login/", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      toast.error(`${err.response.data.emailnotfound}`)
      }
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};