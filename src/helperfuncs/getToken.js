import { tokenKey } from "../common/constants";

export function getLoggedInToken() {
  const loggedInToken = localStorage.getItem(tokenKey);
  return loggedInToken;
}

// Setup config with token - helper function
export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const tokenConfig = (getState) => {
  const token = getState().authReducer.token;
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
};

export const appTokenConfig = (token) => {
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
};

export const tokenImageConfig = (getState) => {
  const token = getState().authReducer.token;
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
    config.headers["content-type"] = "multipart/form-data";
  }
  return config;
};

export const appTokenImageConfig = (token) => {
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
    config.headers["content-type"] = "multipart/form-data";
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
