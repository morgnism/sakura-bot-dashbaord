import { RoleAction, RoleType, type GuildConfig } from '@prisma/client';
import { decimalToHex } from '~/utils/hex-to-decimal';
import { bigintSerializer } from '~/utils/serializer';
import db from './db.server';
import { AutoRole, ShortRole } from './discord.server';

export type ShortRoleAction = typeof RoleAction.ADD | typeof RoleAction.REMOVE;

export type NonDefaultAutoRole = Omit<AutoRole, 'action'> & {
  action?: ShortRoleAction;
};

type AutoRoleGroups = {
  readonly allRoles: AutoRole[];
  autoRoles: NonDefaultAutoRole[];
};

type UpdateAutoRoleMutation = {
  role: string;
  action: string;
  delay: number;
};

type AdminRoleGroups = {
  readonly guildRoles: ShortRole[];
  adminRolesIds: string[];
};

export const getAllRoles = async (
  serverId: string
): Promise<AutoRoleGroups> => {
  console.log('Loading all saved roles...');
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const config = await db.roleConfig.findUnique({
    where: { guildId },
    select: { roles: true },
  });

  if (!config) {
    return { allRoles: [], autoRoles: [] };
  }

  const allRoles = config.roles.reduce((a: AutoRole[], role) => {
    a.push({
      id: String(role.id),
      name: role.name,
      color: decimalToHex(role.color),
      action: role.action,
      delay: role.delay ? role.delay : 0,
    });
    return a;
  }, []);

  const autoRoles = allRoles.reduce((a: NonDefaultAutoRole[], role) => {
    if (role.action !== RoleAction.DEFAULT && typeof role.delay === 'number') {
      a.push({
        ...role,
        action: role.action,
      });
    }
    return a;
  }, []);

  return { allRoles, autoRoles };
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
  const { role, delay } = updates;
  const action =
    updates.action === RoleAction.ADD ? RoleAction.ADD : RoleAction.REMOVE;
  const id = BigInt(role);

  const result = await db.roleConfig.update({
    where: { guildId },
    data: {
      roles: {
        update: {
          where: { id },
          data: { action, delay },
        },
      },
    },
    select: {
      roles: {
        where: { id },
        select: { id: true, name: true, action: true, delay: true },
      },
    },
  });

  const serialize = JSON.stringify(result, bigintSerializer);
  return JSON.parse(serialize) as UpdateAutoRoleMutation;
};
