import { Link } from '@remix-run/react';
import ProfileMenuButton from '../ProfileMenu';

const Navbar = () => (
  <nav
    className="mx-auto flex max-w-7xl items-center justify-between gap-6 p-6 lg:px-8"
    aria-label="global"
  >
    <div className="flex items-center gap-12">
      <Link to="/" className="-m-[0.375rem] p-[0.375rem]">
        <span className="sr-only">Your Company</span>
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=600"
          alt=""
        />
      </Link>
      <Link
        to="/dashboard"
        className="text-sm font-semibold leading-6 text-[#111827] dark:text-white"
      >
        Dashboard
      </Link>
    </div>
    <ProfileMenuButton />
  </nav>
);

export default Navbar;
