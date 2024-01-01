import { AppRoutes } from './route';

export const FeatureKeys = {
  WELCOME: 'welcomeConfig',
  LEAVE: 'leaveConfig',
  AUTOROLE: 'autoroleConfig',
  MODERATION: 'moderationConfig',
};

export const enum FeatureTypes {
  SERVER_MANAGEMENT = 'Server Management',
}

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
    FeatureKeys.WELCOME,
    {
      to: `.${AppRoutes.WELCOME}`,
      label: 'Welcome',
      enabled: false,
      weight: 1,
      type: FeatureTypes.SERVER_MANAGEMENT,
    },
  ],
  [
    FeatureKeys.LEAVE,
    {
      to: `.${AppRoutes.LEAVE}`,
      label: 'Goodbye',
      enabled: false,
      weight: 2,
      type: FeatureTypes.SERVER_MANAGEMENT,
    },
  ],
  [
    FeatureKeys.AUTOROLE,
    {
      to: `.${AppRoutes.AUTO_ROLES}`,
      label: 'Auto Roles',
      enabled: false,
      weight: 3,
      type: FeatureTypes.SERVER_MANAGEMENT,
    },
  ],
  [
    FeatureKeys.MODERATION,
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
