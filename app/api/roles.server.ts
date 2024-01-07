import { RoleType, type GuildConfig } from '@prisma/client';
import { fetchGuildRoles } from '~/lib/api';
import { ShortRole } from '~/type';
import db from './db.server';

export type RoleGroups = {
  readonly guildRoles: ShortRole[];
  adminRoles: ShortRole[];
};

// Gets the server's admin roles
export const getAdminRoles = async (serverId: string): Promise<RoleGroups> => {
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const config = await db.roleConfig.findUnique({
    where: { guildId },
    select: { roles: true },
  });

  if (!config) {
    return { guildRoles: [], adminRoles: [] };
  }

  const guildRoles = config.roles.map((role) => ({
    id: String(role.id),
    color: role.color.toString(16),
    name: role.name,
    type: role.type,
  }));

  const adminRoles = guildRoles.filter(
    (role) => role.type === RoleType.ADMINISTRATOR
  );

  return { guildRoles, adminRoles };
};
