export function getLoggedInToken() {
  const loggedInToken = localStorage.getItem("token");
  return loggedInToken;
}
