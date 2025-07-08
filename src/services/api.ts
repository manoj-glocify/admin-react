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

// Simple event emitter for error messages
class ErrorEventEmitter {
  listeners: ((msg: string) => void)[] = [];
  emit(msg: string) { this.listeners.forEach(fn => fn(msg)); }
  subscribe(fn: (msg: string) => void) { this.listeners.push(fn); return () => { this.listeners = this.listeners.filter(f => f !== fn); }; }
}
export const errorEventEmitter = new ErrorEventEmitter();

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
        localStorage.removeItem(config.auth.tokenKey);
        localStorage.removeItem(config.auth.refreshTokenKey);
        //  window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    // Global error handling
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorEventEmitter.emit('Something went wrong, please try after some time.');
          break;
        case 403:
          errorEventEmitter.emit('Permission denied.');
          break;
        case 404:
          errorEventEmitter.emit('Invalid API.');
          break;
        case 500:
          errorEventEmitter.emit('Something went wrong, please try after some time.');
          break;
        default:
          errorEventEmitter.emit('An unexpected error occurred.');
      }
    }

    return Promise.reject(error);
  }
);

export default api;
