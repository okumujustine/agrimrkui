import axios from "axios";
import { toast } from "react-toastify";

import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  REFRESH_TOKEN_SUCCESS,
} from "../types";

export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  await dispatch(checkTokenExpiry());

  axios
    .get("http://127.0.0.1:5000/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({ type: AUTH_ERROR });
    });
};

export const registerUser = (user) => (dispatch) => {
  if (
    !user.confirm ||
    !user.region ||
    !user.district ||
    !user.contact ||
    !user.name ||
    !user.password
  ) {
    toast.error("Provide all required fields!");
    return;
  }

  if (user.password !== user.confirm) {
    toast.error("Password must match");
    return;
  }

  const body = {
    country: user.country,
    region: user.region,
    district: user.district,
    phone: user.contact,
    name: user.name,
    email: user.email,
    password: user.password,
    status: user.status,
    role: user.role,
  };

  axios
    .post("http://127.0.0.1:5000/auth/signup", body, config)
    .then((res) => {
      toast.success(`${user.contact} successfuly, you can login`);
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};

// LOGIN USER
export const loginUser = (user) => (dispatch) => {
  // Request Body
  const body = { phone: user.contact, password: user.password };
  console.log(body);

  axios
    .post("http://127.0.0.1:5000/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.data,
      });
      toast.success(`${user.contact} successfuly logged in`);
    })
    .catch((error) => {
      dispatch({
        type: LOGIN_FAILED,
      });
      toast.error(error.response.data.message);
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
};

export const checkTokenExpiry = () => async (dispatch, getState) => {
  const auth_token = getState().authReducer.token;

  if (!auth_token) {
    return;
  }

  try {
    const res = await axios.post(
      "http://127.0.0.1:5000/auth/checkiftokenexpire",
      {},
      tokenConfig(getState)
    );
    const { data } = await res;
    return data.success;
  } catch {
    const refresh_token = getState().authReducer.refreshToken;
    if (!refresh_token) {
      dispatch({ type: AUTH_ERROR });
      return false;
    }
    const res = await axios.post(
      "http://127.0.0.1:5000/auth/refreshtoken",
      {},
      refreshTokenConfig(getState)
    );
    await dispatch({
      type: REFRESH_TOKEN_SUCCESS,
      payload: res.data,
    });
    return true;
  }
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  const token = getState().authReducer.token;
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
};

export const refreshTokenConfig = (getState) => {
  const token_refresh = getState().authReducer.refreshToken;
  if (token_refresh) {
    config.headers["Authorization"] = "Bearer " + token_refresh;
  }
  return config;
};
