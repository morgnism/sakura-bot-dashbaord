import { AutoformatRule } from '@udecode/plate-autoformat';
import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
} from '@udecode/plate-code-block';
import { TCommentText } from '@udecode/plate-comments';
import {
  CreatePlateEditorOptions,
  DOMHandler,
  Decorate,
  DecorateEntry,
  EDescendant,
  EElement,
  EElementEntry,
  EElementOrText,
  EMarks,
  ENode,
  ENodeEntry,
  EText,
  ETextEntry,
  InjectComponent,
  InjectProps,
  KeyboardHandler,
  NoInfer,
  OnChange,
  OverrideByKey,
  PlateEditor,
  PlateId,
  PlatePlugin,
  PlatePluginComponent,
  PlatePluginInsertData,
  PlatePluginProps,
  PlateProps,
  PluginOptions,
  SerializeHtml,
  TElement,
  TNodeEntry,
  TReactEditor,
  TText,
  WithOverride,
  createPlateEditor,
  createPluginFactory,
  createPlugins,
  createTEditor,
  getTEditor,
  useEditorRef,
  useEditorState,
} from '@udecode/plate-common';
import { ELEMENT_LINK, TLinkElement } from '@udecode/plate-link';
import {
  ELEMENT_MENTION,
  ELEMENT_MENTION_INPUT,
  TMentionElement,
  TMentionInputElement,
} from '@udecode/plate-mention';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import React from 'react';

/**
 * Text
 */

export type EmptyText = {
  text: '';
};

export type PlainText = {
  text: string;
};

export interface RichText extends TText, TCommentText {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

/**
 * Inline Elements
 */

export interface MyLinkElement extends TLinkElement {
  type: typeof ELEMENT_LINK;
  children: RichText[];
}

export interface MyMentionInputElement extends TMentionInputElement {
  type: typeof ELEMENT_MENTION_INPUT;
  children: [PlainText];
}

export interface MyMentionElement extends TMentionElement {
  type: typeof ELEMENT_MENTION;
  children: [EmptyText];
}

export type MyInlineElement =
  | MyLinkElement
  | MyMentionElement
  | MyMentionInputElement;
export type MyInlineDescendant = MyInlineElement | RichText;
export type MyInlineChildren = MyInlineDescendant[];

/**
 * Block props
 */

export interface MyIndentProps {
  indent?: number;
}

export interface MyIndentListProps extends MyIndentProps {
  listStart?: number;
  listRestart?: number;
  listStyleType?: string;
}

export interface MyLineHeightProps {
  lineHeight?: React.CSSProperties['lineHeight'];
}

export interface MyAlignProps {
  align?: React.CSSProperties['textAlign'];
}

export interface MyBlockElement
  extends TElement,
    MyIndentListProps,
    MyLineHeightProps {
  id?: PlateId;
}

/**
 * Blocks
 */

export interface MyParagraphElement extends MyBlockElement {
  type: typeof ELEMENT_PARAGRAPH;
  children: MyInlineChildren;
}

export interface MyCodeBlockElement extends MyBlockElement {
  type: typeof ELEMENT_CODE_BLOCK;
  children: MyCodeLineElement[];
}

export interface MyCodeLineElement extends TElement {
  type: typeof ELEMENT_CODE_LINE;
  children: PlainText[];
}

export type MyNestableBlock = MyParagraphElement;

export type MyBlock = Exclude<MyElement, MyInlineElement>;
export type MyBlockEntry = TNodeEntry<MyBlock>;

export type MyRootBlock = MyParagraphElement | MyCodeBlockElement;

export type MyValue = MyRootBlock[];

/**
 * Editor types
 */

export type MyEditor = PlateEditor<MyValue> & { isDragging?: boolean };
export type MyReactEditor = TReactEditor<MyValue>;
export type MyNode = ENode<MyValue>;
export type MyNodeEntry = ENodeEntry<MyValue>;
export type MyElement = EElement<MyValue>;
export type MyElementEntry = EElementEntry<MyValue>;
export type MyText = EText<MyValue>;
export type MyTextEntry = ETextEntry<MyValue>;
export type MyElementOrText = EElementOrText<MyValue>;
export type MyDescendant = EDescendant<MyValue>;
export type MyMarks = EMarks<MyValue>;
export type MyMark = keyof MyMarks;

/**
 * Plate types
 */

export type MyDecorate<P = PluginOptions> = Decorate<P, MyValue, MyEditor>;
export type MyDecorateEntry = DecorateEntry<MyValue>;
export type MyDOMHandler<P = PluginOptions> = DOMHandler<P, MyValue, MyEditor>;
export type MyInjectComponent = InjectComponent<MyValue>;
export type MyInjectProps = InjectProps<MyValue>;
export type MyKeyboardHandler<P = PluginOptions> = KeyboardHandler<
  P,
  MyValue,
  MyEditor
>;
export type MyOnChange<P = PluginOptions> = OnChange<P, MyValue, MyEditor>;
export type MyOverrideByKey = OverrideByKey<MyValue, MyEditor>;
export type MyPlatePlugin<P = PluginOptions> = PlatePlugin<
  P,
  MyValue,
  MyEditor
>;
export type MyPlatePluginInsertData = PlatePluginInsertData<MyValue>;
export type MyPlatePluginProps = PlatePluginProps<MyValue>;
export type MyPlateProps = PlateProps<MyValue, MyEditor>;
export type MySerializeHtml = SerializeHtml<MyValue>;
export type MyWithOverride<P = PluginOptions> = WithOverride<
  P,
  MyValue,
  MyEditor
>;

/**
 * Plate store, Slate context
 */

export const getMyEditor = (editor: MyEditor) =>
  getTEditor<MyValue, MyEditor>(editor);
export const useMyEditorRef = () => useEditorRef<MyValue, MyEditor>();
export const useMyEditorState = () => useEditorState<MyValue, MyEditor>();

/**
 * Utils
 */
export const createMyEditor = () => createTEditor() as MyEditor;
export const createMyPlateEditor = (
  options: CreatePlateEditorOptions<MyValue, MyEditor> = {}
) => createPlateEditor<MyValue, MyEditor>(options);
export const createMyPluginFactory = <P = PluginOptions>(
  defaultPlugin: PlatePlugin<NoInfer<P>, MyValue, MyEditor>
) => createPluginFactory(defaultPlugin);
export const createMyPlugins = (
  plugins: PlatePlugin[],
  options?: {
    components?: Record<string, PlatePluginComponent>;
    overrideByKey?: OverrideByKey;
  }
) => createPlugins<MyValue, MyEditor>(plugins, options);

export type MyAutoformatRule = AutoformatRule<MyValue, MyEditor>;
