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
import { baseUrl, tokenKey, refreshTokenKey } from "../../../common/constants";
import {
  tokenConfig,
  refreshTokenConfig,
  config,
} from "../../../helperfuncs/getToken";

export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  await dispatch(checkTokenExpiry());

  axios
    .get(`${baseUrl}/auth/user`, tokenConfig(getState))
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

export const loadUserWhenAlreadyLoggedIn = () => async (dispatch, getState) => {
  await dispatch(checkTokenExpiry());
  axios
    .get(`${baseUrl}/auth/user/`, tokenConfig(getState))
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
    .post(`${baseUrl}/auth/signup`, body, config)
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

  axios
    .post(`${baseUrl}/auth/login`, body, config)
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

export const checkTokenExpiry = () => async (dispatch, getState) => {
  const auth_token = getState().authReducer.token;

  if (!auth_token) {
    return;
  }

  try {
    const res = await axios.post(
      `${baseUrl}/auth/checkiftokenexpire`,
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
    try {
      const res = await axios.post(
        `${baseUrl}/auth/refreshtoken`,
        {},
        refreshTokenConfig(getState)
      );
      await dispatch({
        type: REFRESH_TOKEN_SUCCESS,
        payload: res.data,
      });
      return true;
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  }
};

export const logoutUser = () => (dispatch, getState) => {
  const token = getState().authReducer.token;
  const token_refresh = getState().authReducer.refreshToken;

  if (token) {
    axios
      .post(
        `${baseUrl}/auth/logout/access`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          console.error(res.data.error);
        } else {
          localStorage.removeItem(tokenKey);
        }
      });
  }
  if (token_refresh) {
    axios
      .post(
        `${baseUrl}/auth/logout/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token_refresh}`,
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          console.error(res.data.error);
        } else {
          localStorage.removeItem(refreshTokenKey);
        }
      });
  }
  localStorage.clear();
  dispatch({ type: LOGOUT_SUCCESS });
  toast.success(`successfuly logged out`);
  setTimeout(() => (window.location = "/"), 500);
};
