import { createCookieSessionStorage } from '@remix-run/node';
import { AUTH_SECRET, IS_PRODUCTION } from '~/lib/constants';

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [AUTH_SECRET],
    secure: IS_PRODUCTION,
  },
});

export let { getSession, commitSession, destroySession } = sessionStorage;
