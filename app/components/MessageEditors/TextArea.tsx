import { Plate } from '@udecode/plate-common';
import { Editor } from './editor';
import { plugins } from './plate-plugins';
import { editableProps } from './editableProps';
import { cn } from '@udecode/cn';

export type Document = {
  id: string;
  type: string;
  children: {
    text: string;
  }[];
};

type TextAreaProps = {
  data: Document[];
};

export function TextArea({ data }: TextAreaProps) {
  return (
    <Plate plugins={plugins} initialValue={data} normalizeInitialValue>
      <Editor
        {...editableProps}
        variant="ghost"
        size="md"
        focusRing={false}
        className={cn(editableProps.className, 'p-4 bg-[#2C2F33] rounded-r')}
      />
    </Plate>
  );
}

export default TextArea;
