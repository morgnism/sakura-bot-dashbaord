import type { GuildConfig, Prisma } from '@prisma/client';
import { PartialDiscordGuild } from 'remix-auth-socials';
import { fetchWithBot, fetchWithUser } from '~/lib/api';
import { DISCORD_BASE_URL, RegisteredModules } from '~/lib/constants';
import { PartialGuildChannel } from '~/type';
import { bigintSerializer } from '~/utils/serializer-polyfill';
import db from './db.server';
export type { GuildConfig } from '@prisma/client';

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

// Gets all the configs for a guild with their enabled status
export const getAllConfigs = async (serverId: string) => {
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const include = Object.keys(RegisteredModules).reduce(
    (b: Omit<Prisma.GuildConfigInclude, 'id'>, module) => ({
      ...b,
      [module]: { where: { guildId }, select: { enabled: true } },
    }),
    {}
  );

  const configs = await db.guildConfig.findUnique({
    where: { id: guildId },
    include,
  });
  const serialize = JSON.stringify(configs, bigintSerializer);
  return JSON.parse(serialize) as typeof configs;
};
