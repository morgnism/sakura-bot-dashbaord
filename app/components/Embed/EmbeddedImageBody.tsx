import { Trash2 } from 'lucide-react';
import { Button } from '../plate-ui/button';

type EmbeddedImageBodyProps = {
  onRemove: () => void;
};

const EmbeddedImageBody = ({ onRemove }: EmbeddedImageBodyProps) => {
  return (
    <div className="flex gap-5">
      <div className="max-w-[545px] lg:w-[545px]">
        <img
          className="rounded"
          src="https://cdn-longterm.mee6.xyz/plugins/welcome_message/banners/1161640178310316032/welcome.gif"
          alt=""
        />
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

export default EmbeddedImageBody;
