import { LoaderFunctionArgs } from '@remix-run/node';
import { AppRoutes } from '~/lib/route';
import { authenticator } from '~/server/auth.server';

export const action = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.logout(request, { redirectTo: AppRoutes.HOME });
};
