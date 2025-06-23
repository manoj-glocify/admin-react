import api from "./api";
import config from "../config";

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
interface PasswordData {
  currentPassword: string;
  newPassword: string;
}
interface NewUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  roleId: string;
}
interface ProfileData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avartar: string;
}
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  isActive: boolean;
}

interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: {
      name: string;
    };
  };
  message: string;
}
interface profileInfoUpdate {
  firstName: string;
  lastName: string;
  email: string;
}
const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    const {token, refreshToken, user} = response.data;

    const role = user?.role?.name;

    localStorage.setItem(config.auth.tokenKey, token);
    localStorage.setItem(config.auth.refreshTokenKey, refreshToken);
    if (role) {
      localStorage.setItem(config.auth.role.name, role);
    }
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    const {token, refreshToken} = response.data;

    // Store tokens in localStorage
    localStorage.setItem(config.auth.tokenKey, token);
    localStorage.setItem(config.auth.refreshTokenKey, refreshToken);

    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } finally {
      // Clear tokens regardless of API call success
      localStorage.removeItem(config.auth.tokenKey);
      localStorage.removeItem(config.auth.refreshTokenKey);
      localStorage.removeItem(config.auth.role.name);
      window.location.href = "/login";
    }
  },

  async refreshToken(): Promise<{token: string}> {
    const refreshToken = localStorage.getItem(config.auth.refreshTokenKey);
    const response = await api.post<{token: string}>("/auth/refresh", {
      refreshToken,
    });

    const {token} = response.data;
    localStorage.setItem(config.auth.tokenKey, token);

    return response.data;
  },

  async getCurrentUser(): Promise<ProfileData | null> {
    const token = localStorage.getItem(config.auth.tokenKey);
    if (!token) return null;

    try {
      const response = await api.get("/profile");
      return response.data;
    } catch (error) {
      return null;
    }
  },
  async getDashboardData(): Promise<AuthResponse["user"] | null> {
    const token = localStorage.getItem(config.auth.tokenKey);
    if (!token) return null;

    try {
      const response = await api.get("/auth/dashboard");
      return response.data;
    } catch (error) {
      return null;
    }
  },
  // async getUserlists(): Promise<AuthResponse["user"] | null> {
  //   const token = localStorage.getItem(config.auth.tokenKey);
  //   if (!token) return null;

  //   try {
  //     const response = await api.get<{userlists: User[]}>("/auth/userlists");
  //     return response.data.userlists;
  //   } catch (error) {
  //     return null;
  //   }
  // },
  getUserlists: async (): Promise<AuthResponse["user"] | null> => {
    // const token = localStorage.getItem(config.auth.tokenKey);
    // if (!token) return null;
    try {
      const response = await api.get("/user/userlists"); // or whatever your route is
      return response.data.userlists; //
    } catch (error) {
      return null;
    }
  },
  getRoleslists: async (): Promise<AuthResponse["user"] | null> => {
    const token = localStorage.getItem(config.auth.tokenKey);
    if (!token) return null;
    try {
      const response = await api.get("/roles"); // or whatever your route is
      return response.data; //
    } catch (error) {
      return null;
    }
  },

  async newUser(data: NewUserData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/user/create", data);

    return response.data;
  },

  async getUserById(id: string): Promise<UserData | null> {
    const token = localStorage.getItem(config.auth.tokenKey);
    if (!token) return null;

    try {
      const response = await api.get(`/user/${id}`);
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      return null;
    }
  },
  async updateUserById(id: string, data: UserData): Promise<AuthResponse> {
    const token = localStorage.getItem(config.auth.tokenKey);
    if (!token) throw new Error("Authentication token missing");

    try {
      const response = await api.put(`/user/update/${id}`, data);
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw error;
    }
  },
  async deleteUserById(id: string): Promise<AuthResponse> {
    const token = localStorage.getItem(config.auth.tokenKey);
    if (!token) throw new Error("Authentication token missing");

    try {
      const response = await api.delete(`/user/delete/${id}`);
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw error;
    }
  },
  async updateProfile(data: profileInfoUpdate): Promise<AuthResponse> {
    const token = localStorage.getItem(config.auth.tokenKey);
    if (!token) throw new Error("Authentication token missing");

    try {
      const response = await api.put(`/profile/`, data);
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw error;
    }
  },
  async changePassword(data: PasswordData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      "/profile/change-password",
      data
    );

    return response.data;
  },
  async updateProfilePic(file: File): Promise<AuthResponse> {
    const token = localStorage.getItem(config.auth.tokenKey);
    if (!token) throw new Error("Authentication token missing");
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await api.put(`/profile/update-pic`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to update profile picture:", error);
      throw error;
    }
  },
  isAuthenticated(): boolean {
    return !!localStorage.getItem(config.auth.tokenKey);
  },
  getRole(): string | null {
    return localStorage.getItem("user_role");
  },
};

export default authService;
