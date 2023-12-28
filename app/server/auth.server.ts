import { Authenticator } from 'remix-auth';
import { DiscordStrategy, SocialsProvider } from 'remix-auth-socials';
import { fetchBotGuilds, fetchUserGuilds } from '~/lib/api';
import { AUTH_URL } from '~/lib/constants';
import { sessionStorage } from '~/server/session.server';
import { DiscordUser } from '~/type';
export let authenticator = new Authenticator<DiscordUser>(sessionStorage);

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
      const botGuilds = await fetchBotGuilds();
      const guilds = userGuilds.filter(
        ({ owner, permissions }) =>
          owner || (parseInt(permissions) & 0x8) === 0x8
      );
      // const matcher = (guidId: string) => botGuilds.some((botGuild) => botGuild.id === guidId)
      // const mutualGuilds = userGuilds.map((guild) => matcher(guild.id));

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
