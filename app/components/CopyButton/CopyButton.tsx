import { useCopyToClipboard } from '~/hooks/useCopyToClipboard';
import { Icons } from '../icons';
import { Button } from '../ui/button';

type CopyButtonProps = {
  toCopy: string;
};

const CopyButton = ({ toCopy }: CopyButtonProps) => {
  const [copiedText, copy] = useCopyToClipboard();
  const handleClick = () => {
    copy(toCopy);
  };

  return (
    <Button className="transition" variant="ghost" onClick={handleClick}>
      {copiedText ? (
        <>
          <Icons.checkCircle2 className="mr-2 h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Icons.copy className="mr-2 h-4 w-4" />
          Server ID
        </>
      )}
    </Button>
  );
};

export default CopyButton;
