import { DiscordUser } from '~/server/auth.server';
import { useMatchesData } from './useMatchesData';

const isUser = (user: any): user is DiscordUser => {
  return user && typeof user === 'object' && typeof user.email === 'string';
};

export const useOptionalUser = (): DiscordUser | undefined => {
  const user = useMatchesData<DiscordUser>('root');
  if (!user || !isUser(user)) {
    return undefined;
  }
  return user;
};

export const useUser = (): DiscordUser => {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.'
    );
  }
  return maybeUser;
};
