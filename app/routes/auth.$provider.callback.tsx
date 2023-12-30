import { LoaderFunctionArgs } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { AppRoutes } from '~/lib/constants';
import { authenticator } from '~/server/auth.server';

export const loader = ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.provider, 'Missing provider param');
  return authenticator.authenticate(params.provider, request, {
    successRedirect: AppRoutes.DASHBOARD,
    failureRedirect: AppRoutes.HOME,
  });
};
