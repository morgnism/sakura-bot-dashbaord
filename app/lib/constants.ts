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
}

export const RegisteredModules = {
  welcomeConfig: true,
  leaveConfig: true,
  autoroleConfig: true,
  moderationConfig: true,
};

const FeaturesKeys = {
  WELCOME: 'welcomeConfig',
  LEAVE: 'leaveConfig',
  AUTOROLE: 'autoroleConfig',
  MODERATION: 'moderationConfig',
};

const FeatureDefaults = {
  isAvailable: true,
  isEnabled: true,
  isPremiumFeature: false,
};

export const enum FeatureTypes {
  SERVER_MANAGEMENT = 'Server Management',
}

export const AvailableFeatures = new Map<string, typeof FeatureDefaults>();

export const setMap = () => {
  Object.values(FeaturesKeys).map((feature) =>
    AvailableFeatures.set(feature, FeatureDefaults)
  );
};

setMap();

// Navigation Menus

export const MAIN_SIDEBAR_MENU = [
  { to: '', label: 'Dashboard' },
  { to: './settings', label: 'Settings' },
];

export const Features = [
  {
    moduleKey: 'welcomeConfig',
    to: `./${AppRoutes.WELCOME}`,
    label: 'Welcome',
    enabled: false,
    weight: 1,
    type: FeatureTypes.SERVER_MANAGEMENT,
  },
  {
    moduleKey: 'leaveConfig',
    to: `./${AppRoutes.LEAVE}`,
    label: 'Goodbye',
    enabled: false,
    weight: 2,
    type: FeatureTypes.SERVER_MANAGEMENT,
  },
  {
    moduleKey: 'autoroleConfig',
    to: `./${AppRoutes.AUTO_ROLES}`,
    label: 'Auto Roles',
    enabled: false,
    weight: 3,
    type: FeatureTypes.SERVER_MANAGEMENT,
  },
  {
    moduleKey: 'moderationConfig',
    to: `./${AppRoutes.MODERATOR}`,
    label: 'Moderator',
    enabled: false,
    weight: 4,
    type: FeatureTypes.SERVER_MANAGEMENT,
  },
];
