import axios from "axios";

import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  AUTH_ERROR,
  GET_ERRORS,
} from "../types";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("http://127.0.0.1:5000/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error.message);
      dispatch({ type: AUTH_ERROR });
    });
};

export const registerUser = (user) => (dispatch) => {
  console.log(user);
  dispatch({ type: USER_LOADING });
  axios.post("http://localhost:4030/products").then((res) => {
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  });
};

// LOGIN USER
export const loginUser = (user) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = { phone: user.contact, password: user.password };

  axios
    .post("http://127.0.0.1:5000/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: LOGIN_FAILED,
      });
      const errorObj = {
        message: error.response.data.message,
        status: error.response.status,
      };
      dispatch({
        type: GET_ERRORS,
        payload: errorObj,
      });
    });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().authReducer.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["x-access-token"] = token;
  }

  return config;
};
