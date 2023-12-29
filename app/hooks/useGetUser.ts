import { useRouteLoaderData } from '@remix-run/react';
import { DiscordUser } from '~/type';

function isUser(user: any): user is DiscordUser {
  return user && typeof user === 'object' && typeof user.email === 'string';
}

export function useGetUser(): DiscordUser | null {
  const user = useRouteLoaderData<DiscordUser>('root');
  if (!isUser(user)) {
    return null;
  }

  return user;
}
