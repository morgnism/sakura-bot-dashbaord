import { createPlugins } from '@udecode/plate-common';
import { deserializationPlugins } from './deserialization-plugins';
import { functionalityPlugins } from './funtionality-plugins';
import { marksPlugins } from './marks-plugins';
import { nodesPlugins } from './nodes-plugins';
import { plateUI } from './plate-ui';

export const plugins = createPlugins(
  [
    ...nodesPlugins,
    ...marksPlugins,
    // Block Style
    ...functionalityPlugins,
    ...deserializationPlugins,
  ],
  {
    components: plateUI,
  }
);
