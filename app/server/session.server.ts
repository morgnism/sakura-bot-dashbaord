import { createCookieSessionStorage } from '@remix-run/node';
import { NEXTAUTH_SECRET, IS_PRODUCTION } from '~/lib/config';

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [NEXTAUTH_SECRET],
    secure: IS_PRODUCTION,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
