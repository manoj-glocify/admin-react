import axios, {InternalAxiosRequestConfig} from "axios";
import config from "../config";

const api = axios.create({
  baseURL: `${config.api.url}/${config.api.version}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (axiosConfig: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(config.auth.tokenKey);
    if (token && axiosConfig.headers) {
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }
    return axiosConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(config.auth.refreshTokenKey);
        const response = await axios.post(`${config.api.url}/auth/refresh`, {
          refreshToken,
        });

        const {token} = response.data;
        localStorage.setItem(config.auth.tokenKey, token);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return api(originalRequest);
      } catch (error) {
        // Handle refresh token failure
        localStorage.removeItem(config.auth.tokenKey);
        localStorage.removeItem(config.auth.refreshTokenKey);
        //  window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
