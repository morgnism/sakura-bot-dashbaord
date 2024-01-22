import { createAutoformatPlugin } from '@udecode/plate-autoformat';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from '@udecode/plate-break';
import {
  ELEMENT_CODE_BLOCK,
  isCodeBlockEmpty,
  isSelectionAtCodeBlockStart,
  unwrapCodeBlock,
} from '@udecode/plate-code-block';
import { createComboboxPlugin } from '@udecode/plate-combobox';
import { createNodeIdPlugin } from '@udecode/plate-node-id';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { createResetNodePlugin } from '@udecode/plate-reset-node';
import { createDeletePlugin } from '@udecode/plate-select';
import { createBlockSelectionPlugin } from '@udecode/plate-selection';
import { createTrailingBlockPlugin } from '@udecode/plate-trailing-block';
import { autoformatPlugin } from './autoformatPlugin';

const resetBlockTypesCodeBlockRule = {
  types: [ELEMENT_CODE_BLOCK],
  defaultType: ELEMENT_PARAGRAPH,
  onReset: unwrapCodeBlock,
};

/**
 * Enables editor functionality for keyboard short codes
 * and other event handlers.
 */
export const functionalityPlugins = [
  createAutoformatPlugin(autoformatPlugin),
  createBlockSelectionPlugin({
    options: {
      sizes: {
        top: 0,
        bottom: 0,
      },
    },
  }),
  createComboboxPlugin(),
  createExitBreakPlugin({
    options: {
      rules: [
        {
          hotkey: 'mod+enter',
        },
        {
          hotkey: 'mod+shift+enter',
          before: true,
        },
        {
          hotkey: 'enter',
          query: {
            start: true,
            end: true,
            // allow: KEYS_HEADING,
          },
          relative: true,
          level: 1,
        },
      ],
    },
  }),
  createComboboxPlugin(),
  createNodeIdPlugin(),
  createResetNodePlugin({
    options: {
      rules: [
        {
          ...resetBlockTypesCodeBlockRule,
          hotkey: 'Enter',
          predicate: isCodeBlockEmpty,
        },
        {
          ...resetBlockTypesCodeBlockRule,
          hotkey: 'Backspace',
          predicate: isSelectionAtCodeBlockStart,
        },
      ],
    },
  }),
  createDeletePlugin(),
  createSoftBreakPlugin({
    options: {
      rules: [
        { hotkey: 'shift+enter' },
        {
          hotkey: 'enter',
          query: {
            allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE],
          },
        },
      ],
    },
  }),
  createTrailingBlockPlugin({
    options: { type: ELEMENT_PARAGRAPH },
  }),
];
