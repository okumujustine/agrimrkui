import { tokenKey } from "../common/constants";

export function getLoggedInToken() {
  const loggedInToken = localStorage.getItem(tokenKey);
  return loggedInToken;
}
