import { Channels, GuildConfig, Prisma, RoleType } from '@prisma/client';
import { FeatureKeys } from '~/lib/features';
import { bigintSerializer } from '~/utils/serializer';
import db from './db.server';
import {
  GuildChannelTypes,
  ShortRole,
  fetchGuildChannels,
  fetchGuildRoles,
} from './discord.server';

export type { GuildConfig } from '@prisma/client';

export const DEFAULT_ROLE = '@everyone';

type GuildSettings = Omit<GuildConfig, 'id'> & { id: string };

type GuildChannel = Omit<Channels, 'id'> & { id: string };

export type ShortGuildChannel = {
  id: string;
  name: string;
  isUpdatesChannel: boolean;
};

export type EnabledFeatures = {
  [feature: string]: boolean;
};

type UpdateGuildConfigMutation = EnabledFeatures;

type UpdateSettingsMutation = {
  prefix: string;
  roles: string[];
  updatesChannel: string;
};

type SavedSettingsMutation = {
  id: string;
  prefix: string;
  roleConfig: { roles: ShortRole[] };
  channels: GuildChannel[];
};

export const activateGuild = async (serverId: string) => {
  console.log(`Activating Guild (${serverId})`);
  const guildId: GuildConfig['id'] = BigInt(serverId);

  try {
    const data = await db.guildConfig.upsert({
      where: { id: guildId },
      create: { id: guildId, active: true },
      update: { active: { set: true } },
    });

    if (!data) {
      throw 'Failed to active guild!';
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const initiateFeatures = async (serverId: string) => {
  console.log(`Initiating Guild Features (${serverId})`);
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const updates = Object.values(FeatureKeys).reduce(
    (a: Prisma.GuildConfigUpdateInput, key) => {
      return {
        ...a,
        [key]: {
          connectOrCreate: { where: { guildId }, create: { enabled: false } },
        },
      };
    },
    {}
  );
  const select = Object.values(FeatureKeys).reduce(
    (a: Prisma.GuildConfigSelect, key) => {
      return {
        ...a,
        [key]: true,
      };
    },
    {}
  );

  try {
    const data = await db.guildConfig.update({
      where: { id: guildId },
      data: updates,
      select,
    });

    if (!data) {
      throw 'Failed to instantiate features!';
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const setInitialRoles = async (serverId: string) => {
  console.log('Setting guild roles...');
  const guildRoles = await fetchGuildRoles(serverId);
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const roles = guildRoles.reduce((a: Prisma.RoleCreateManyInput[], role) => {
    if (role.name === DEFAULT_ROLE) {
      return a;
    }

    a.push({
      id: BigInt(role.id),
      name: role.name,
      color: role.color,
    });

    return a;
  }, []);

  try {
    const data = await db.roleConfig.update({
      where: { guildId },
      data: {
        roles: { createMany: { data: roles, skipDuplicates: true } },
      },
      select: { roles: true },
    });

    if (!data) {
      throw 'Failed to instantiate features!';
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const setInitialChannels = async (serverId: string) => {
  console.log('Setting guild channels...');
  const guildChannels = await fetchGuildChannels(serverId);
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const channels = guildChannels.reduce(
    (a: Prisma.ChannelsCreateManyGuildInput[], channel) => {
      if (channel.type !== GuildChannelTypes.GUILD_TEXT) {
        return a;
      }

      a.push({
        id: BigInt(channel.id),
        name: channel.name,
        type: channel.type,
      });

      return a;
    },
    []
  );

  try {
    const data = await db.guildConfig.update({
      where: { id: guildId },
      data: {
        channels: {
          createMany: { data: channels, skipDuplicates: true },
        },
      },
      select: { channels: true },
    });

    if (!data) {
      throw 'Failed to set guild channels!';
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Gets all the configs for a guild with their enabled status
export const getFeaturesActiveStatuses = async (serverId: string) => {
  console.log('Loading active features...');
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const select = Object.values(FeatureKeys).reduce(
    (a: Prisma.GuildConfigInclude, module) => ({
      ...a,
      [module]: { where: { guildId }, select: { enabled: true } },
    }),
    {}
  );

  try {
    const data = await db.guildConfig.findUnique({
      where: { id: guildId },
      select,
    });

    if (!data) {
      throw 'Failed to fetch feature statuses!';
    }

    const serialize = JSON.stringify(data, bigintSerializer);
    return JSON.parse(serialize) as EnabledFeatures;
  } catch (error) {
    throw error;
  }
};

export const updateFeatureStatus = async (
  serverId: string,
  updates: UpdateGuildConfigMutation
) => {
  console.log('Updating active feature status...');
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

  try {
    const data = await db.guildConfig.update({
      where: { id: guildId },
      ...guildUpdates,
    });

    if (!data) {
      throw `Failed to update with ${JSON.stringify(updates, null, 2)}.`;
    }

    const serialize = JSON.stringify(data, bigintSerializer);
    return JSON.parse(serialize);
  } catch (error) {
    throw error;
  }
};

// Gets the server's main settings
export const getServerSettings = async (serverId: string) => {
  console.log(`Loading settings for Guild (${serverId})`);
  const guildId: GuildConfig['id'] = BigInt(serverId);
  try {
    const data = await db.guildConfig.findUnique({
      where: { id: guildId },
    });

    if (!data) {
      throw 'Failed to fetch server settings!';
    }

    const serialize = JSON.stringify(data, bigintSerializer);
    return JSON.parse(serialize) as GuildSettings;
  } catch (error) {
    throw error;
  }
};

// Gets the server's saved channels
export const getServerChannels = async (
  serverId: string
): Promise<ShortGuildChannel[]> => {
  console.log(`Loading channels for Guild (${serverId})`);
  const guildId: GuildConfig['id'] = BigInt(serverId);

  try {
    const data = await db.channels.findMany({
      where: { guildId },
    });

    if (!data) {
      throw 'Failed to fetch guild channels!';
    }

    return data.map((channel) => ({
      id: String(channel.id),
      name: channel.name,
      isUpdatesChannel: channel.isUpdatesChannel,
    }));
  } catch (error) {
    throw error;
  }
};

export const updateServerSettings = async (
  serverId: string,
  updates: UpdateSettingsMutation
) => {
  console.log('Updating server settings...');
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const { prefix, roles, updatesChannel: updatesChannelId } = updates;
  const rolesUpdateManyInputs: Prisma.RoleUpdateManyWithWhereWithoutRoleConfigInput[] =
    roles.map((id) => ({
      where: { id: BigInt(id), type: RoleType.DEFAULT },
      data: {
        type: RoleType.ADMINISTRATOR,
        protected: true,
      },
    }));

  const rolesWhereNotInputs: Prisma.RoleScalarWhereInput[] = roles.map(
    (id) => ({ id: BigInt(id), type: RoleType.ADMINISTRATOR })
  );

  const result = await db.guildConfig.update({
    where: { id: guildId },
    data: {
      prefix,
      roleConfig: {
        update: {
          where: { guildId },
          data: {
            roles: {
              updateMany: [
                ...rolesUpdateManyInputs,
                {
                  where: { NOT: rolesWhereNotInputs },
                  data: {
                    type: RoleType.DEFAULT,
                    protected: false,
                  },
                },
              ],
            },
          },
        },
      },
      channels: {
        updateMany: [
          {
            where: { id: BigInt(updatesChannelId) },
            data: { isUpdatesChannel: true },
          },
          {
            where: { NOT: { id: BigInt(updatesChannelId) } },
            data: { isUpdatesChannel: false },
          },
        ],
      },
    },
    select: {
      id: true,
      prefix: true,
      roleConfig: { select: { roles: true } },
      channels: true,
    },
  });

  const serialize = JSON.stringify(result, bigintSerializer);
  return JSON.parse(serialize) as SavedSettingsMutation;
};
