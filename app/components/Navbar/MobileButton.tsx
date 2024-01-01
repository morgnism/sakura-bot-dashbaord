import { Button } from '../ui/button';

type MobileButtonProps = {
  onClick: () => void;
};

const MobileButton = ({ onClick }: MobileButtonProps) => (
  <Button
    type="button"
    className="text-[#4f46e5] lg:hidden p-0"
    onClick={onClick}
  >
    <span className="sr-only">Open sidebar</span>
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
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      ></path>
    </svg>
  </Button>
);

export default MobileButton;
