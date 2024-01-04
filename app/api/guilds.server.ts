import type { GuildConfig, Prisma } from '@prisma/client';
import { PartialDiscordGuild } from 'remix-auth-socials';
import { fetchWithBot, fetchWithUser } from '~/lib/api';
import { DISCORD_BASE_URL } from '~/lib/constants';
import { FeatureKeys } from '~/lib/features';
import { FeatureConfigs, PartialGuildChannel } from '~/type';
import { bigintSerializer } from '~/utils/serializer';
import db from './db.server';

export type { GuildConfig } from '@prisma/client';

export type GuildSettings = {
  id: string;
  active: boolean;
  prefix: string;
  afkChannelId: string | null;
  publicUpdatesChannelId: string | null;
  rulesChannelId: string | null;
  safetyAlertsChannelId: string | null;
  systemChannelId: string | null;
  createAt: Date;
  updateAt: Date;
};

export type EnabledFeatures = {
  [feature: string]: boolean;
};

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
export const getAllConfigEnabledStatuses = async (serverId: string) => {
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const select = Object.values(FeatureKeys).reduce(
    (b: Omit<Prisma.GuildConfigInclude, 'id'>, module) => ({
      ...b,
      [module]: { where: { guildId }, select: { enabled: true } },
    }),
    {}
  );

  const configs = await db.guildConfig.findUnique({
    where: { id: guildId },
    select,
  });
  const serialize = JSON.stringify(configs, bigintSerializer);
  return JSON.parse(serialize) as EnabledFeatures;
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
  const allSettings = await getAllConfigEnabledStatuses(serverId);
  const settings = Object.entries(allSettings);
  let configs = [];
  for (let [key, value] of settings) {
    if (isEnabled(value)) {
      configs.push({ name: key, enabled: value.enabled });
    }
  }
  return configs;
};

type UpdateGuildConfigMutation = EnabledFeatures;

export const updateFeatureStatus = async (
  serverId: string,
  updates: UpdateGuildConfigMutation
) => {
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const guildUpdates = Object.entries(updates).reduce(
    (a, [name, enabled]) => {
      return {
        ...a,
        select: {
          ...a.select,
          [name]: true,
        },
        data: {
          ...a.data,
          [name]: { update: { enabled } },
        },
      };
    },
    {
      select: {} as Prisma.GuildConfigSelect,
      data: {} as Prisma.GuildConfigUpdateInput,
    }
  );
  const config = await db.guildConfig.update({
    where: { id: guildId },
    ...guildUpdates,
  });

  const serialize = JSON.stringify(config, bigintSerializer);
  return JSON.parse(serialize);
};

// Gets the server's main settings
export const getServerSettings = async (serverId: string) => {
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const configs = await db.guildConfig.findUnique({
    where: { id: guildId },
  });
  const serialize = JSON.stringify(configs, bigintSerializer);
  return JSON.parse(serialize) as GuildSettings;
};
