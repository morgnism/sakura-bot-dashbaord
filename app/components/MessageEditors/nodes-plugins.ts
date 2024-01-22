import { createCodeBlockPlugin } from '@udecode/plate-code-block';
import { createLinkPlugin } from '@udecode/plate-link';
import { createParagraphPlugin } from '@udecode/plate-paragraph';

/**
 * Enables applying plate-ui components to nodes.
 */
export const nodesPlugins = [
  createParagraphPlugin(),
  createCodeBlockPlugin(),
  createLinkPlugin(),
];
