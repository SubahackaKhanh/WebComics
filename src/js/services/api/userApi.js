import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // send cookie
});

let csrfToken = null;

export const initCSRF = async () => {
  try {
    const { data } = await api.get("/csrf-token");
    csrfToken = data.csrfToken;
    api.defaults.headers["X-CSRF-Token"] = csrfToken;
  } catch (err) {
    console.error("An error occurred while initializing the CSRF token: ", err?.response?.data || err.message);
  }
}

api.interceptors.request.use(async (config) => {
  if (["post", "put", "patch", "delete"].includes(config.method?.toLowerCase())){
    if(!csrfToken){
      const { data } = await api.get("/csrf-token");
      csrfToken = data.csrfToken;
      api.defaults.headers["X-CSRF-Token"] = csrfToken;
    }
    config.headers["X-CSRF-Token"] = csrfToken;
  }
  return config;
});

export default api;

export const signup = (username, email, password, confirmPassword) =>
  api.post("/auth/signup", { username, email, password, confirmPassword });

export const login = (identifier, password) =>
  api.post("/auth/login", { identifier, password });

export const getProfile = () =>
  api.get("/user/profile");

export const getFavorites = () =>
  api.get("/favorite");

export const logout = () =>
  api.post("/auth/logout");
