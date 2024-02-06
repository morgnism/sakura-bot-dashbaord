import { cn } from '@udecode/cn';
import {
  PlateContentProps,
  TRenderLeafProps,
  TText,
  Value,
  createPluginFactory,
  createPlugins,
  isText,
} from '@udecode/plate-common';
import Prism from 'prismjs';
import 'prismjs/components/prism-markdown.js';
import { nodesPlugins } from './nodes-plugins';
import { plateUI } from './plate-ui';

/**
 * Decorate texts with markdown preview.
 */
const decoratePreview =
  () =>
  ([node, path]: any) => {
    const ranges: any[] = [];

    if (!isText(node)) {
      return ranges;
    }

    const getLength = (token: any) => {
      if (typeof token === 'string') {
        return token.length;
      }
      if (typeof token.content === 'string') {
        return token.content.length;
      }
      return token.content.reduce((l: any, t: any) => l + getLength(t), 0);
    };

    const tokens = Prism.tokenize(node.text, Prism.languages.markdown);
    let start = 0;
    for (const token of tokens) {
      const length = getLength(token);
      const end = start + length;
      if (typeof token !== 'string') {
        ranges.push({
          [token.type]: true,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        });
      }
      start = end;
    }

    return ranges;
  };

const createPreviewPlugin = createPluginFactory({
  key: 'preview-md',
  decorate: decoratePreview,
});

const plugins = createPlugins([...nodesPlugins, createPreviewPlugin()], {
  components: plateUI,
});

const PreviewLeaf = ({
  attributes,
  leaf,
  children,
}: TRenderLeafProps<
  Value,
  TText & {
    italic?: boolean;
    code?: boolean;
    bold?: boolean;
    strikethrough?: boolean;
  }
>) => {
  const { italic, code, bold, strikethrough } = leaf;

  return (
    <span
      {...attributes}
      className={cn(
        bold && 'font-bold',
        italic && 'italic',
        code && 'bg-[#eee] p-[3px] font-mono',
        strikethrough && 'line-through'
      )}
    >
      {children}
    </span>
  );
};

export const editableProps: PlateContentProps = {
  spellCheck: false,
  autoFocus: false,
  placeholder: 'Enter a message...',
  renderLeaf: PreviewLeaf,
};
