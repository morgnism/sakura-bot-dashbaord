import { Authenticator } from 'remix-auth';
import { DiscordStrategy, SocialsProvider } from 'remix-auth-socials';
import { fetchUserGuilds } from '~/api/guilds.server';
import { createUser } from '~/api/user.server';
import { AUTH_URL } from '~/lib/config';
import { DiscordUser } from '~/type';
import { sessionStorage } from './session.server';

export const authenticator = new Authenticator<DiscordUser>(sessionStorage);

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
    async ({
      accessToken,
      refreshToken,
      extraParams,
      profile,
    }): Promise<DiscordUser> => {
      const userGuilds = await fetchUserGuilds(accessToken);
      const guilds = userGuilds.filter(
        ({ owner, permissions }) =>
          owner || (parseInt(permissions) & 0x8) === 0x8
      );
      // const botGuilds = await fetchBotGuilds();
      // const matcher = (guidId: string) => botGuilds.some((botGuild) => botGuild.id === guidId)
      // const mutualGuilds = userGuilds.map((guild) => matcher(guild.id));

      const id = BigInt(profile.id);

      try {
        const user = await createUser(id, guilds);
        console.log(`User (${user.id})`);
      } catch (error) {
        console.log(error);
        throw error;
      }

      return {
        id: profile.id,
        displayName: profile.displayName,
        avatar: profile.__json.avatar,
        email: profile.__json.email,
        accessToken,
        refreshToken: refreshToken ?? '',
        guilds,
      };
    }
  )
);
