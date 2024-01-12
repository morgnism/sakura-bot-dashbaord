import { Link } from '@remix-run/react';

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => (
  <Link to="/" className={className}>
    <span className="sr-only">Your Company</span>
    <img
      className="h-8 w-auto"
      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=600"
      alt="Your Company"
    />
  </Link>
);

export default Logo;
