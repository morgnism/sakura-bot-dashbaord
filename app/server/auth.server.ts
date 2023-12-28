import { Authenticator } from 'remix-auth';
import { sessionStorage } from '~/server/session.server';
import {
  DiscordProfile,
  DiscordStrategy,
  SocialsProvider,
} from 'remix-auth-socials';
import { AUTH_URL } from '~/lib/constants';
export let authenticator = new Authenticator<DiscordProfile>(sessionStorage);

const getCallback = (provider: SocialsProvider) => {
  return `${AUTH_URL}/auth/${provider}/callback`;
};

authenticator.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID ?? '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
      callbackURL: getCallback(SocialsProvider.DISCORD),
      scope: ['identify', 'guilds'],
    },
    async ({ profile }) => {
      // here you would find or create a user in your database
      return profile;
    }
  )
);
