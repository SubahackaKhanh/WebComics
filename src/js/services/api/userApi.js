import axios from "axios";

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor - Tự động thêm token vào mọi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = async (username, email, password, confirmPassword) => {
  const response = await api.post("/user/signup", {
    username, email, password, confirmPassword
  });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const login = async (identifier, password) => {
  const response = await api.post("/user/login", { identifier, password });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Protected API calls
export const getProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};

export const getFavorites = async () => {
  const response = await api.get("/favorite"); // Đã có token tự động
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};