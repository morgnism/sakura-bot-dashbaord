import { createCookie } from '@remix-run/node';
import { IS_PRODUCTION } from '~/lib/config';

export const returnToCookie = createCookie('return-to', {
  path: '/',
  httpOnly: true,
  sameSite: 'lax',
  maxAge: 60, // 1 minute because it makes no sense to keep it for a long time
  secure: IS_PRODUCTION,
});
