// export const CLIENT_REDIRECT_URI = '/api/auth/signin?callbackUrl=';

const API_VERSION = '10';

export const DISCORD_BASE_URL = `https://discord.com/api/v${API_VERSION}`;

export const enum AppRoutes {
  AUTH = '/auth',
  LOGIN = '/login',
  LOGOUT = '/',
  DASHBOARD = '/dashboard',
}
