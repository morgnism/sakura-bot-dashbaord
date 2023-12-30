import { Link, useLocation } from '@remix-run/react';
import classNames from 'classnames';
import { hasChildPath } from '~/utils/path-utils';
import Divider from '../Divider';
import Logo from '../Logo';
import ProfileMenuButton from '../ProfileMenu';
import MobileButton from './MobileButton';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const { pathname } = useLocation();
  const isDashboardPath = hasChildPath(pathname);

  return (
    <nav
      className={classNames([
        'mx-auto flex max-w-7xl items-center justify-between gap-6 h-16 lg:px-8',
        isDashboardPath ? 'bg-[#111827] border-b border-[#e5e7eb] shadow' : '',
      ])}
      aria-label="global"
    >
      <div className="flex items-center gap-8 lg:gap-12">
        {isDashboardPath ? (
          <>
            <MobileButton onClick={() => {}} />
            <Divider className="lg:hidden" />
          </>
        ) : (
          <>
            <Logo />
            <Link
              to="/dashboard"
              className="text-sm font-semibold leading-6 text-[#111827] dark:text-white"
            >
              Dashboard
            </Link>
          </>
        )}
      </div>
      <div className="flex gap-x-4 items-center self-stretch lg:gap-x-6">
        {isDashboardPath && (
          <>
            <NotificationBell onClick={() => {}} />
            <Divider className="lg:block md:hidden" />
          </>
        )}
        <ProfileMenuButton />
      </div>
    </nav>
  );
};

export default Navbar;
