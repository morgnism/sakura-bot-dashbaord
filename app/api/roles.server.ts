import { RoleAction, RoleType, type GuildConfig, Prisma } from '@prisma/client';
import { decimalToHex } from '~/utils/hex-to-decimal';
import { bigintSerializer } from '~/utils/serializer';
import db from './db.server';
import { AutoRole, ShortRole } from './discord.server';

export type ShortRoleAction = typeof RoleAction.ADD | typeof RoleAction.REMOVE;

export type NonDefaultAutoRole = {
  role: string;
  action: string;
  delay: number;
};

type UpdateAutoRoleMutation = {
  roles: NonDefaultAutoRole[];
};

type AdminRoleGroups = {
  readonly guildRoles: ShortRole[];
  adminRolesIds: string[];
};

export const getAllRoles = async (serverId: string): Promise<AutoRole[]> => {
  console.log('Loading all saved roles...');
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const config = await db.roleConfig.findUnique({
    where: { guildId },
    select: { roles: true },
  });

  if (!config) {
    return [];
  }

  return config.roles.reduce((a: AutoRole[], role) => {
    a.push({
      id: String(role.id),
      name: role.name,
      color: decimalToHex(role.color),
      action: role.action,
      delay: role.delay ? role.delay : 0,
    });
    return a;
  }, []);
};

// Gets the server's admin roles
export const getAdminRoles = async (
  serverId: string
): Promise<AdminRoleGroups> => {
  console.log('Loading admin roles...');
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const config = await db.roleConfig.findUnique({
    where: { guildId },
    select: { roles: true },
  });

  if (!config) {
    return { guildRoles: [], adminRolesIds: [] };
  }

  const guildRoles = config.roles.map((role) => ({
    id: String(role.id),
    color: decimalToHex(role.color),
    name: role.name,
    type: role.type,
  }));

  const adminRolesIds = guildRoles.reduce((a: string[], role) => {
    if (role.type !== RoleType.ADMINISTRATOR) {
      return a;
    }
    a.push(role.id);
    return a;
  }, []);

  return { guildRoles, adminRolesIds };
};

export const saveAutoRole = async (
  serverId: string,
  updates: UpdateAutoRoleMutation
) => {
  console.log('Saving auto roles...');
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const rolesWhereUpdateManyInputs = updates.roles.reduce(
    (
      a: Prisma.RoleUpdateManyWithWhereWithoutRoleConfigInput[],
      { role, action, delay }
    ) => {
      if (!role) {
        a.push({
          where: {
            OR: [{ action: RoleAction.ADD }, { action: RoleAction.REMOVE }],
          },
          data: { action: RoleAction.DEFAULT, delay: null },
        });

        return a;
      }

      const id = BigInt(role);

      if (action === RoleAction.ADD) {
        a.push({
          where: { id },
          data: { action: RoleAction.ADD, delay },
        });
      }

      if (action === RoleAction.REMOVE) {
        a.push({
          where: { id },
          data: { action: RoleAction.REMOVE, delay },
        });
      }

      return a;
    },
    []
  );

  const result = await db.roleConfig.update({
    where: { guildId },
    data: {
      roles: {
        updateMany: rolesWhereUpdateManyInputs,
      },
    },
    select: {
      roles: {
        where: { delay: { gte: 0 } },
        select: { id: true, action: true, delay: true },
      },
    },
  });

  const roles = result.roles.map((role) => ({
    role: role.id,
    action: role.action,
    delay: role.delay,
  }));

  const serialize = JSON.stringify(roles, bigintSerializer);
  return JSON.parse(serialize) as UpdateAutoRoleMutation;
};
