import { PartialDiscordGuild } from 'remix-auth-socials/build/strategies/discord';
import { PartialGuildChannel } from '~/type';
import { DISCORD_BASE_URL, DISCORD_TOKEN } from './constants';

export const fetcher = async <T>(
  uri: string,
  { headers, ...options }: RequestInit = {}
): Promise<T> => {
  const headersObject = new Headers(headers);
  const res = await fetch(uri, {
    ...options,
    headers: headersObject,
  });

  if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`);

  return res.json() || undefined;
};

// =========== Base clients ===========
export const fetchWithBot = <T>(url: string): Promise<T> =>
  fetcher(url, {
    headers: {
      Authorization: `Bot ${DISCORD_TOKEN}`,
    },
  });

export const fetchWithUser = <T>(
  url: string,
  accessToken: string
): Promise<T> =>
  fetcher(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

// =========== Derived Clients ===========

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
