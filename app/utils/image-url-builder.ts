import { DISCORD_BASE_CDN_URL } from '~/lib/constants';

export const enum ExtensionNames {
  'jpg',
  'jpeg',
  'png',
  'webp',
  'gif',
}
export type ExtensionTypeNames = keyof typeof ExtensionNames;

export const enum CDNTypes {
  'emoji',
  'avatars',
}

export type CDNTypeNames = keyof typeof CDNTypes;

type ImageUrlBuilderOptions = {
  size?: number;
  ext?: ExtensionTypeNames;
  resource?: CDNTypeNames;
};

const DefaultImageUrlBuilderOptions: ImageUrlBuilderOptions = {
  ext: 'webp',
  size: 16,
};

const isPow2 = (number: number) => Math.log(number) / Math.log(2);

export const imageUrlBuilder = (
  id: string,
  imageHash: string | null,
  options = DefaultImageUrlBuilderOptions
): string | undefined => {
  const { ext, size, resource } = {
    ...DefaultImageUrlBuilderOptions,
    ...options,
  };

  if (!id || !imageHash || (size && !isPow2(size)) || !resource) {
    return undefined;
  }

  return `${DISCORD_BASE_CDN_URL}/${resource}/${id}/${imageHash}.${ext}`;
};
