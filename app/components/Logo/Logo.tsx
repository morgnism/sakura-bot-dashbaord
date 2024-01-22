import { Link } from '@remix-run/react';
import { cn } from '~/utils/cn';
import { Icons } from '../icons';

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => (
  <Link to="/" className={cn('flex items-center', className)}>
    <span className="sr-only">Your Company</span>
    <Icons.leaf className="h-8 w-8" />
    {/* <img
      className="h-8 w-auto"
      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=600"
      alt="Your Company"
    /> */}
    <span className="ml-4 text-xl text-white">Sakura Bot</span>
  </Link>
);

export default Logo;
