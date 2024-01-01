import { cn } from '~/utils/cn';

type DividerProps = {
  className: string;
};

const Divider = ({ className }: DividerProps) => (
  <div
    className={cn('bg-[#e5e7eb] w-px h-6', className)}
    aria-hidden="true"
  ></div>
);

export default Divider;
