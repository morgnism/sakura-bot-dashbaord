import type { DiscordUser, Prisma } from '@prisma/client';
import { PartialDiscordGuild } from 'remix-auth-socials';
import { RegisteredModules } from '~/lib/constants';
import db from './db.server';

const seedData = (guilds: PartialDiscordGuild[]) =>
  guilds.reduce(
    (a: Prisma.GuildConfigCreateOrConnectWithoutUsersInput[], guild) => {
      if (!guild || !guild.id) {
        return a;
      }

      const id = Number(guild.id);

      const configInputs = Object.keys(RegisteredModules).reduce(
        (b: Omit<Prisma.GuildConfigCreateWithoutUsersInput, 'id'>, module) => ({
          ...b,
          [module]: {
            connectOrCreate: {
              where: { guildId: id },
              create: { enabled: false },
            },
          },
        }),
        {}
      );

      const input: Prisma.GuildConfigCreateOrConnectWithoutUsersInput = {
        where: { id },
        create: {
          id,
          ...configInputs,
        },
      };

      a.push(input);
      return a;
    },
    []
  );

export const createUser = async (
  id: DiscordUser['id'],
  guilds: PartialDiscordGuild[]
) => {
  const guildInputs = seedData(guilds);

  return await db.discordUser.upsert({
    where: { id },
    create: { id, guilds: { connectOrCreate: guildInputs } },
    update: {}, // don't update the record
  });
};
