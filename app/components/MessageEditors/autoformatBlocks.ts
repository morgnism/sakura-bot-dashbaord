import { AutoformatRule } from '@udecode/plate-autoformat';
import {
  ELEMENT_CODE_BLOCK,
  insertEmptyCodeBlock,
} from '@udecode/plate-code-block';
import { ELEMENT_DEFAULT } from '@udecode/plate-common';

export const autoformatBlocks: AutoformatRule[] = [
  {
    mode: 'block',
    type: ELEMENT_CODE_BLOCK,
    match: '```',
    triggerAtBlockStart: false,
    format: (editor) => {
      insertEmptyCodeBlock(editor, {
        defaultType: ELEMENT_DEFAULT,
        insertNodesOptions: { select: true },
      });
    },
  },
];
