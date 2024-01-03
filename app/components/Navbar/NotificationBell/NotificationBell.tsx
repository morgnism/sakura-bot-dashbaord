import { Button } from '~/components/ui/button';

type NotificationBellProps = {
  onClick: () => void;
};

const NotificationBell = ({ onClick }: NotificationBellProps) => (
  <Button
    type="button"
    className="text-[#9ca3af] hover:text-[#6b7280] p-0 bg-transparent hover:bg-transparent"
    onClick={onClick}
  >
    <span className="sr-only">View notifications</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
      ></path>
    </svg>
  </Button>
);

export default NotificationBell;
