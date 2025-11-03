import axios from "axios";

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // gửi cookie phiên
});

export const signup = async (username, email, password, confirmPassword) => {
  const response = await api.post("/user/signup", {
    username, email, password, confirmPassword
  });
  return response.data;
};

export const login = async (identifier, password) => {
  const response = await api.post("/user/login", { identifier, password });
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
  await api.post("/user/logout");
};