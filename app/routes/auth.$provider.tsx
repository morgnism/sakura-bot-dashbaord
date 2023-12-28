import { ActionFunctionArgs, redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { AppRoutes } from '~/lib/constants';
import { authenticator } from '~/server/auth.server';

export const loader = () => redirect(AppRoutes.LOGIN);

export const action = ({ request, params }: ActionFunctionArgs) => {
  invariant(params.provider, 'Missing provider param');
  return authenticator.authenticate(params.provider, request);
};
