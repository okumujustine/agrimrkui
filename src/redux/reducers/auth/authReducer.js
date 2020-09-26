import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_FAILED,
  LOGOUT_SUCCESS,
  REFRESH_TOKEN_SUCCESS,
} from "../../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isAuthenticated: null,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };
    case AUTH_ERROR:
    case LOGIN_FAILED:
    case REGISTER_FAILED:
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };
    case REFRESH_TOKEN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
