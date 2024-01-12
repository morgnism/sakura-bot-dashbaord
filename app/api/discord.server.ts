import { RoleAction } from '@prisma/client';
import { PartialDiscordGuild } from 'remix-auth-socials';
import { DISCORD_TOKEN } from '../lib/config';
import { DISCORD_BASE_URL } from '../lib/constants';

export { RoleAction } from '@prisma/client';

export enum GuildChannelTypes {
  GUILD_TEXT = 0,
  DM = 1,
  GUILD_VOICE = 2,
  GROUP_DM = 3,
  GUILD_CATEGORY = 4,
  GUILD_ANNOUNCEMENT = 5,
  ANNOUNCEMENT_THREAD = 10,
  PUBLIC_THREAD = 11,
  PRIVATE_THREAD = 12,
  GUILD_STAGE_VOICE = 13,
  GUILD_DIRECTORY = 14,
  GUILD_FORUM = 15,
  GUILD_MEDIA = 16,
}

export type PartialGuildChannel = {
  id: string;
  last_message_id: string;
  type: number;
  name: string;
  position: number;
  parent_id?: string;
  topic?: string;
  guild_id: string;
  permission_overwrites: string[];
  nsfw: boolean;
  rate_limit_per_user: string;
  banner?: string;
};

export type GuildRole = {
  id: string;
  color: number;
  description: string | null;
  flags: number;
  hoist: boolean;
  icon: number | null;
  managed: boolean;
  mentionable: boolean;
  name: string;
  permissions: string;
  position: number;
  unicode_emoji: string | null;
};

export type AutoRole = {
  id: string;
  name: string;
  color: string;
  action: RoleAction;
  delay: number;
};

export type ShortRole = {
  id: string;
  color: string;
  name: string;
  type: string;
};

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

// Get Bot as Guild Member
export const fetchMe = async () =>
  await fetchWithBot(`${DISCORD_BASE_URL}/users/@me`);

// Get Guilds Bot is a member of
export const fetchBotGuilds = async (): Promise<PartialDiscordGuild[]> =>
  await fetchWithBot(`${DISCORD_BASE_URL}/users/@me/guilds`);

// Get All Guild roles
export const fetchGuildRoles = async (guildId: string): Promise<GuildRole[]> =>
  await fetchWithBot(`${DISCORD_BASE_URL}/guilds/${guildId}/roles`);

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
