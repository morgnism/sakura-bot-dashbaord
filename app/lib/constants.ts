export const DISCORD_TOKEN = process.env.DISCORD_TOKEN ?? '';
export const AUTH_URL = process.env.AUTH_URL ?? '';
export const AUTH_SECRET = process.env.AUTH_SECRET ?? '';
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
// export const CLIENT_REDIRECT_URI = '/api/auth/signin?callbackUrl=';

const API_VERSION = '10';

export const DISCORD_BASE_URL = `https://discord.com/api/v${API_VERSION}`;

export const enum AppRoutes {
  AUTH = '/auth',
  LOGIN = '/login',
  LOGOUT = '/',
  DASHBOARD = '/dashboard',
}
