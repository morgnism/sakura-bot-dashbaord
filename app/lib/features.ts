import { AppRoutes } from './route';

export const FeatureKeys = {
  WELCOME: 'welcomeConfig',
  LEAVE: 'leaveConfig',
  AUTOROLE: 'roleConfig',
  MODERATION: 'moderationConfig',
};

export const enum FeatureTypes {
  SERVER_MANAGEMENT = 'Server Management',
}

export type Feature = {
  name?: string;
  to: string;
  label: string;
  enabled: boolean;
  type: FeatureTypes;
  description: string;
};

export const FeatureMap = new Map<string, Feature>([
  [
    FeatureKeys.WELCOME,
    {
      to: `.${AppRoutes.WELCOME}`,
      label: 'Welcome',
      description: 'Send a welcome message to new members.',
      enabled: false,
      type: FeatureTypes.SERVER_MANAGEMENT,
    },
  ],
  [
    FeatureKeys.LEAVE,
    {
      to: `.${AppRoutes.GREETING}`,
      label: 'Goodbye',
      description: 'Send a goodbye message to leaving members.',
      enabled: false,
      type: FeatureTypes.SERVER_MANAGEMENT,
    },
  ],
  [
    FeatureKeys.AUTOROLE,
    {
      to: `.${AppRoutes.AUTO_ROLES}`,
      label: 'Auto Roles',
      description: 'Let Sakura handle member roles.',
      enabled: false,
      type: FeatureTypes.SERVER_MANAGEMENT,
    },
  ],
  [
    FeatureKeys.MODERATION,
    {
      to: `.${AppRoutes.MODERATOR}`,
      label: 'Moderator',
      description:
        'Give moderators powerful moderation tools to keep this server safe.',
      enabled: false,
      type: FeatureTypes.SERVER_MANAGEMENT,
    },
  ],
]);

export const Features = Array.from(FeatureMap);
