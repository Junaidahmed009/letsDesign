import backendurl from "./serverUrl.js";

export const signUpUser = (data) => {
  return backendurl.post("/userauth/signup", data);
};
export const loginUser = (data) => {
  return backendurl.post("/userauth/login", data);
};
export const getCurrentUser = () => {
  return backendurl.get("/userauth/userdata", { withCredentials: true });
};
export const getUserAuth = () => {
  return backendurl.get("/userauth/checkAuth", { withCredentials: true });
};
export const userLogout = () => {
  return backendurl.get("/userauth/logout", { withCredentials: true });
};
