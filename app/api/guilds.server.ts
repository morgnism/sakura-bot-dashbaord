import type { GuildConfig, Prisma } from '@prisma/client';
import { PartialDiscordGuild } from 'remix-auth-socials';
import { fetchWithBot, fetchWithUser } from '~/lib/api';
import { DISCORD_BASE_URL } from '~/lib/constants';
import { FeatureKeys } from '~/lib/features';
import { FeatureConfigs, GuildConfigs, PartialGuildChannel } from '~/type';
import { bigintSerializer } from '~/utils/serializer';
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
  const include = Object.values(FeatureKeys).reduce(
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
  return JSON.parse(serialize) as GuildConfigs;
};

function isEnabled(value: any): value is {
  enabled: boolean;
} {
  return (
    value &&
    typeof value === 'object' &&
    !(value instanceof Date) &&
    'enabled' in value
  );
}

export const getFeatures = async (
  serverId: string
): Promise<FeatureConfigs[]> => {
  const allSettings = await getAllConfigs(serverId);
  const settings = Object.entries(allSettings);
  let configs = [];
  for (let [key, value] of settings) {
    if (isEnabled(value)) {
      configs.push({ name: key, enabled: value.enabled });
    }
  }
  return configs;
};

export const updateFeature = async (
  serverId: string,
  updates: {
    name: string;
    enabled: boolean;
  }
) => {
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const { name, ...rest } = updates;
  const config = await db.guildConfig.update({
    where: { id: guildId },
    select: { [name]: true },
    data: { [name]: { update: { ...rest } } },
  });

  const serialize = JSON.stringify(config, bigintSerializer);
  return JSON.parse(serialize) as GuildConfigs;
};
