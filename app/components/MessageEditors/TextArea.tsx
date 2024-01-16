import { useCallback, useMemo } from 'react';
import { Descendant, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, RenderElementProps, Slate, withReact } from 'slate-react';

const TextArea = ({ data }: { data: Descendant[] }) => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} initialValue={data}>
      <Editable
        renderElement={renderElement}
        placeholder="Enter a message..."
      />
    </Slate>
  );
};

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    case 'paragraph':
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default TextArea;
