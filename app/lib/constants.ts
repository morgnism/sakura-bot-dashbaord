const API_VERSION = '10';

export const DISCORD_BASE_URL = `https://discord.com/api/v${API_VERSION}`;
export const DISCORD_BASE_CDN_URL = 'https://cdn.discordapp.com';

export const enum AppRoutes {
  HOME = '/',
  AUTH = '/auth',
  LOGIN = '/login',
  DASHBOARD = '/dashboard',
  WELCOME = '/welcome',
  LEAVE = '/leave',
  AUTO_ROLES = '/auto_roles',
  MODERATOR = '/moderator',
  SETTINGS = '/settings',
}

export const FeaturesKeys = {
  WELCOME: 'welcomeConfig',
  LEAVE: 'leaveConfig',
  AUTOROLE: 'autoroleConfig',
  MODERATION: 'moderationConfig',
};

export const enum FeatureTypes {
  SERVER_MANAGEMENT = 'Server Management',
}

// Navigation Menus

export const MAIN_SIDEBAR_MENU = [
  { to: './', label: 'Dashboard' },
  { to: `./${AppRoutes.SETTINGS}`, label: 'Settings' },
];

export class Feature {
  constructor(
    public to: string,
    public label: string,
    public enabled: boolean,
    public weight: number,
    public type: FeatureTypes
  ) {}
}

export const FeatureMap = new Map<string, Feature>([
  [
    FeaturesKeys.WELCOME,
    {
      to: `.${AppRoutes.WELCOME}`,
      label: 'Welcome',
      enabled: false,
      weight: 1,
      type: FeatureTypes.SERVER_MANAGEMENT,
    },
  ],
  [
    FeaturesKeys.LEAVE,
    {
      to: `.${AppRoutes.LEAVE}`,
      label: 'Goodbye',
      enabled: false,
      weight: 2,
      type: FeatureTypes.SERVER_MANAGEMENT,
    },
  ],
  [
    FeaturesKeys.AUTOROLE,
    {
      to: `.${AppRoutes.AUTO_ROLES}`,
      label: 'Auto Roles',
      enabled: false,
      weight: 3,
      type: FeatureTypes.SERVER_MANAGEMENT,
    },
  ],
  [
    FeaturesKeys.MODERATION,
    {
      to: `.${AppRoutes.MODERATOR}`,
      label: 'Moderator',
      enabled: false,
      weight: 4,
      type: FeatureTypes.SERVER_MANAGEMENT,
    },
  ],
]);

export const Features = Array.from(FeatureMap);
