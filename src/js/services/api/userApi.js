import axios from "axios";

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // gửi cookie phiên
});

// Lấy CSRF token từ backend
const getCsrfToken = async () => {
  const { data } = await api.get("/csrf-token");
  return data.csrfToken;
};

export const signup = async (username, email, password, confirmPassword) => {
  const csrfToken = await getCsrfToken();
  const response = await api.post(
    "/user/signup",
    { username, email, password, confirmPassword },
    { headers: { "X-CSRF-Token": csrfToken } }
  );
  return response.data;
};

export const login = async (identifier, password) => {
  const csrfToken = await getCsrfToken();
  const response = await api.post(
    "/user/login",
    { identifier, password },
    { headers: { "X-CSRF-Token": csrfToken } }
  );
  return response.data;
};

// Protected API calls
export const getProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};

export const getFavorites = async () => {
  const response = await api.get("/favorite");
  return response.data;
};

export const logout = async () => {
  const csrfToken = await getCsrfToken();
  await api.post(
    "/user/logout",
    {},
    { headers: { "X-CSRF-Token": csrfToken } }
  );
};