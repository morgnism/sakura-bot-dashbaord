import { Descendant, BaseEditor, BaseRange, Range, Element } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type ImageElement = {
  type: 'image';
  url: string;
  children: EmptyText[];
};

export type ParagraphElement = {
  type: 'paragraph';
  align?: string;
  children: Descendant[];
};

export type TitleElement = { type: 'title'; children: Descendant[] };

export type DescriptionElement = {
  type: 'description';
  children: Descendant[];
};

export type CodeBlockElement = {
  type: 'code-block';
  language: string;
  children: Descendant[];
};

export type CodeLineElement = {
  type: 'code-line';
  children: Descendant[];
};

type CustomElement =
  | ImageElement
  | ParagraphElement
  | TitleElement
  | DescriptionElement
  | CodeBlockElement
  | CodeLineElement;

export type CustomElementTypes =
  | ImageElement['type']
  | ParagraphElement['type']
  | TitleElement['type']
  | DescriptionElement['type']
  | CodeBlockElement['type']
  | CodeLineElement['type'];

export type CustomText = {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  text: string;
};

export type EmptyText = {
  text: string;
};

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    nodeToDecorations?: Map<Element, Range[]>;
  };

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText | EmptyText;
    Range: BaseRange & {
      [key: string]: unknown;
    };
  }
}
