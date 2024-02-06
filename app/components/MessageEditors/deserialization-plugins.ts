import { createDeserializeMdPlugin } from '@udecode/plate-serializer-md';

/**
 * Allows the pasting of certain document types
 * from the clipboard from another document.
 */
export const deserializationPlugins = [createDeserializeMdPlugin()];
