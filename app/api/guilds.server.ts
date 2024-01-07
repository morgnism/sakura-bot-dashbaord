import { RoleType, type GuildConfig, type Prisma } from '@prisma/client';
import { FeatureKeys } from '~/lib/features';
import { hexToDecimal } from '~/utils/hex-to-decimal';
import { bigintSerializer } from '~/utils/serializer';
import db from './db.server';
import { ShortRole, fetchGuildRoles } from '~/lib/api';

export type { GuildConfig } from '@prisma/client';

export const DEFAULT_ROLE = '@everyone';

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

type UpdateGuildConfigMutation = EnabledFeatures;

type UpdateSettingsMutation = {
  prefix: string;
  roles: ShortRole[];
};

export const activateGuild = async (serverId: string) => {
  console.log(`Activating Guild (${serverId})`);
  const guildId: GuildConfig['id'] = BigInt(serverId);

  return await db.guildConfig.upsert({
    where: { id: guildId },
    create: { id: guildId, active: true },
    update: { active: { set: true } },
  });
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

  return await db.guildConfig.update({
    where: { id: guildId },
    data: updates,
  });
};

export const setInitialRoles = async (serverId: string) => {
  console.log(`Setting initials guild roles...`);
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

  return await db.roleConfig.update({
    where: { guildId },
    data: {
      roles: { createMany: { data: roles, skipDuplicates: true } },
    },
  });
};

// Gets all the configs for a guild with their enabled status
export const getActiveFeatures = async (serverId: string) => {
  console.log(`Loading active features...`);
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const select = Object.values(FeatureKeys).reduce(
    (a: Prisma.GuildConfigInclude, module) => ({
      ...a,
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

export const updateFeatureStatus = async (
  serverId: string,
  updates: UpdateGuildConfigMutation
) => {
  console.log(`Updating active feature status...`);
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
  console.log(`Loading settings for Guild (${serverId})`);
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const configs = await db.guildConfig.findUnique({
    where: { id: guildId },
  });
  const serialize = JSON.stringify(configs, bigintSerializer);
  return JSON.parse(serialize) as GuildSettings;
};

export const updateServerSettings = async (
  serverId: string,
  updates: UpdateSettingsMutation
) => {
  console.log(`Updating server settings...`);
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const { prefix, roles } = updates;
  const rolesInputs: Prisma.RoleUpdateManyWithWhereWithoutRoleConfigInput[] =
    roles.map(({ id, ...role }) => ({
      where: { id: BigInt(id) },
      data: {
        ...role,
        color: hexToDecimal(role.color),
        type: role.type as RoleType,
        protected: role.type === RoleType.ADMINISTRATOR,
      },
    }));

  return await db.guildConfig.update({
    where: { id: guildId },
    data: {
      prefix,
      autoroleConfig: {
        update: {
          where: { guildId },
          data: {
            roles: {
              updateMany: rolesInputs,
            },
          },
        },
      },
    },
  });
};
