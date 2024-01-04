import { Menu } from 'lucide-react';
import { Button } from '../ui/button';

type MobileButtonProps = {
  onClick: () => void;
};

const MobileButton = ({ onClick }: MobileButtonProps) => (
  <Button className="lg:hidden p-0 bg-transparent" onClick={onClick}>
    <Menu className="h-5 w-5" />
    <span className="sr-only">Open sidebar</span>
  </Button>
);

export default MobileButton;
