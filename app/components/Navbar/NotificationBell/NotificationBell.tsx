import { Bell } from 'lucide-react';
import { Button } from '~/components/ui/button';

type NotificationBellProps = {
  onClick: () => void;
};

const NotificationBell = ({ onClick }: NotificationBellProps) => (
  <Button
    type="button"
    className="hover:text-zinc-50 text-[#6b7280] p-0 bg-transparent hover:bg-transparent"
    onClick={onClick}
  >
    <span className="sr-only">View notifications</span>
    <Bell className="h-5 w-5" />
  </Button>
);

export default NotificationBell;
