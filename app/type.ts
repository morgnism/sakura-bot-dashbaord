import { DiscordProfile, PartialDiscordGuild } from 'remix-auth-socials';

export type DiscordUser = {
  id: DiscordProfile['id'];
  displayName: DiscordProfile['displayName'];
  avatar: DiscordProfile['__json']['avatar'];
  email: DiscordProfile['__json']['email'];
  guilds: PartialDiscordGuild[];
  accessToken: string;
  refreshToken: string;
};

export type PartialGuild = {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
};

export type PartialGuildChannel = {
  id: string;
  last_message_id: string;
  type: number;
  name: string;
  position: number;
  parent_id?: string;
  topic?: string;
  guild_id: string;
  permission_overwrites: string[];
  nsfw: boolean;
  rate_limit_per_user: string;
  banner?: string;
};

export type FeatureConfigs = {
  name: string;
  enabled: boolean;
};
