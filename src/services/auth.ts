import api from './api';
import config from '../config';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    const { token, refreshToken, user } = response.data;

    // Store tokens in localStorage
    localStorage.setItem(config.auth.tokenKey, token);
    localStorage.setItem(config.auth.refreshTokenKey, refreshToken);

    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    const { token, refreshToken, user } = response.data;

    // Store tokens in localStorage
    localStorage.setItem(config.auth.tokenKey, token);
    localStorage.setItem(config.auth.refreshTokenKey, refreshToken);

    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      // Clear tokens regardless of API call success
      localStorage.removeItem(config.auth.tokenKey);
      localStorage.removeItem(config.auth.refreshTokenKey);
    }
  },

  async refreshToken(): Promise<{ token: string }> {
    const refreshToken = localStorage.getItem(config.auth.refreshTokenKey);
    const response = await api.post<{ token: string }>('/auth/refresh', {
      refreshToken,
    });
    
    const { token } = response.data;
    localStorage.setItem(config.auth.tokenKey, token);
    
    return response.data;
  },

  getCurrentUser(): AuthResponse['user'] | null {
    const token = localStorage.getItem(config.auth.tokenKey);
    if (!token) return null;

    try {
      // Decode JWT token to get user info
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload).user;
    } catch (error) {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(config.auth.tokenKey);
  },
};

export default authService; 