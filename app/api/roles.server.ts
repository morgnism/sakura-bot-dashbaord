import { RoleType, type GuildConfig } from '@prisma/client';
import db from './db.server';
import { ShortRole } from './discord.server';

type RoleGroups = {
  readonly guildRoles: ShortRole[];
  adminRolesIds: string[];
};

// Gets the server's admin roles
export const getAdminRoles = async (serverId: string): Promise<RoleGroups> => {
  console.log(`Loading admin roles...`);
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
    color: role.color.toString(16),
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
