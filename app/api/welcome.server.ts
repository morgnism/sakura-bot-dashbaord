import { GuildConfig, WelcomeConfig } from '@prisma/client';
import { bigintSerializer } from '~/utils/serializer';
import db from './db.server';

type WelcomeChannelSettings = Omit<WelcomeConfig, 'id' | 'channelId'> & {
  id: string;
  channelId: string;
};

export const getWelcomeChannelSettings = async (serverId: string) => {
  console.log('Loading welcome channel settings...');
  const guildId: GuildConfig['id'] = BigInt(serverId);
  const config = await db.welcomeConfig.findUnique({
    where: { guildId },
  });
  const serialize = JSON.stringify(config, bigintSerializer);
  return JSON.parse(serialize) as WelcomeChannelSettings;
};
