import { createCookieSessionStorage } from '@remix-run/node';
import { AUTH_SECRET, IS_PRODUCTION } from '~/lib/config';

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [AUTH_SECRET],
    secure: IS_PRODUCTION,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
