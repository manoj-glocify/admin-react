interface Config {
  api: {
    url: string;
    version: string;
  };
  auth: {
    tokenKey: string;
    refreshTokenKey: string;
    tokenExpiry: number;
    role: {
      name: string;
    };
  };
  app: {
    name: string;
    version: string;
    env: string;
  };
  features: {
    enable2FA: boolean;
    enableGoogleAuth: boolean;
    enableNotifications: boolean;
  };
  services: {
    googleClientId: string;
    sentryDsn: string;
  };
}

const config: Config = {
  api: {
    url: process.env.APP_API_URL || "http://localhost:3000/api",
    version: process.env.APP_API_VERSION || "v1",
  },
  auth: {
    tokenKey: process.env.REACT_APP_AUTH_TOKEN_KEY || "auth_token",
    refreshTokenKey:
      process.env.REACT_APP_AUTH_REFRESH_TOKEN_KEY || "refresh_token",
    tokenExpiry: Number(process.env.REACT_APP_AUTH_TOKEN_EXPIRY) || 3600,
    role: {
      name: "user_role",
    },
  },
  app: {
    name: process.env.REACT_APP_NAME || "Admin Dashboard",
    version: process.env.REACT_APP_VERSION || "1.0.0",
    env: process.env.REACT_APP_ENV || "development",
  },
  features: {
    enable2FA: process.env.REACT_APP_ENABLE_2FA === "true",
    enableGoogleAuth: process.env.REACT_APP_ENABLE_GOOGLE_AUTH === "true",
    enableNotifications: process.env.REACT_APP_ENABLE_NOTIFICATIONS === "true",
  },
  services: {
    googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || "",
    sentryDsn: process.env.REACT_APP_SENTRY_DSN || "",
  },
};

export default config;
