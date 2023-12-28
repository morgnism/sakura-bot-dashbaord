import { LoaderFunctionArgs } from '@remix-run/node';
import { AppRoutes } from '~/lib/constants';
import { authenticator } from '~/server/auth.server';

export let action = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.logout(request, { redirectTo: AppRoutes.LOGOUT });
};
