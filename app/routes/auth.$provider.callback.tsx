import { LoaderFunctionArgs } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { AppRoutes } from '~/lib/route';
import { authenticator } from '~/server/auth.server';
import { returnToCookie } from '~/server/return.server';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.provider, 'Missing provider param');
  const returnTo =
    (await returnToCookie.parse(request.headers.get('Cookie'))) ??
    AppRoutes.DASHBOARD;
  return authenticator.authenticate(params.provider, request, {
    successRedirect: returnTo,
    failureRedirect: AppRoutes.HOME,
  });
};
