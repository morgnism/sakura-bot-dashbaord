import { PartialDiscordGuild } from 'remix-auth-socials';
import { fetchWithBot, fetchWithUser } from '~/lib/api';
import { DISCORD_BASE_URL } from '~/lib/constants';
import { PartialGuildChannel } from '~/type';

// Get Bot as Guild Member
export const fetchMe = async () =>
  await fetchWithBot(`${DISCORD_BASE_URL}/users/@me`);

// Get Guilds Bot is a member of
export const fetchBotGuilds = async (): Promise<PartialDiscordGuild[]> =>
  await fetchWithBot(`${DISCORD_BASE_URL}/users/@me/guilds`);

// Get Guilds User is a member of
export const fetchUserGuilds = async (
  accessToken: string
): Promise<PartialDiscordGuild[]> =>
  await fetchWithUser(`${DISCORD_BASE_URL}/users/@me/guilds`, accessToken);

// Get Guilds channels for a guild
export const fetchGuildChannels = async (
  guildId: string
): Promise<PartialGuildChannel[]> =>
  fetchWithBot(`${DISCORD_BASE_URL}/guilds/${guildId}/channels`);
