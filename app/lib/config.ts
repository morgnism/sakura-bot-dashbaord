export const DISCORD_TOKEN = process.env.DISCORD_TOKEN ?? '';
export const AUTH_URL = process.env.AUTH_URL ?? '';
export const AUTH_SECRET = process.env.AUTH_SECRET ?? '';
export const IS_DEVELOP = process.env.NODE_ENV === 'development';
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
