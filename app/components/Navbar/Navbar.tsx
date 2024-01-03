import { Link, useLocation } from '@remix-run/react';
import { cn } from '~/utils/cn';
import { hasChildPath } from '~/utils/path';
import Logo from '../Logo';
import ProfileMenuButton from '../ProfileMenu';
import { Separator } from '../ui/separator';
import MobileButton from './MobileButton';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const { pathname } = useLocation();
  const isDashboardPath = hasChildPath(pathname);

  return (
    <nav
      className={cn(
        'flex items-center justify-between gap-6 h-16 lg:px-8',
        isDashboardPath
          ? 'border-b border-[#27272a] shadow px-4 md:px-6'
          : 'max-w-7xl mx-auto'
      )}
      aria-label="global"
    >
      <div className="flex items-center gap-6 lg:gap-12">
        {isDashboardPath ? (
          <>
            <MobileButton onClick={() => {}} />
            <Separator className="lg:hidden h-6" orientation="vertical" />
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
            <Separator className="lg:block hidden h-6" orientation="vertical" />
          </>
        )}
        <ProfileMenuButton />
      </div>
    </nav>
  );
};

export default Navbar;
