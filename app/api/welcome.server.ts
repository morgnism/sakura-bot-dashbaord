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
  try {
    const data = await db.welcomeConfig.findUnique({
      where: { guildId },
    });

    if (!data) {
      throw 'Failed to fetch guild channels!';
    }
    const serialize = JSON.stringify(data, bigintSerializer);
    return JSON.parse(serialize) as WelcomeChannelSettings;
  } catch (error) {
    throw error;
  }
};
