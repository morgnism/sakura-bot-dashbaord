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

export type FeatureConfigs = {
  name: string;
  enabled: boolean;
};

export type ShortRole = {
  id: string;
  color: string;
  name: string;
};
