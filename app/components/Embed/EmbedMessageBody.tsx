import { Trash2 } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Button } from '../plate-ui/button';

type EmbedBodyProps = {
  onRemove: () => void;
};

export const EmbedMessageBody = ({
  onRemove,
  children,
}: PropsWithChildren<EmbedBodyProps>) => {
  return (
    <div className="flex gap-5">
      <div className="flex max-w-[545px] lg:w-[545px]">
        <div
          className="w-1 shrink-0 bg-[#202225] rounded-l"
          style={{ backgroundColor: '#0099ff' }}
        ></div>
        {children}
      </div>
      <Button
        type="button"
        variant="destructive"
        className="px-3"
        onClick={() => onRemove()}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default EmbedMessageBody;
