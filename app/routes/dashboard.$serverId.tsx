import { NavLink, Outlet } from '@remix-run/react';
import {
  BadgePlus,
  DoorOpen,
  Hash,
  LayoutDashboard,
  PieChart,
  ScrollText,
  Settings,
  Shield,
} from 'lucide-react';
import Logo from '~/components/Logo';
import Navbar from '~/components/Navbar';
import { AppRoutes } from '~/lib/route';
import { cn } from '~/utils/cn';

export const MAIN_SIDEBAR_MENU = [
  { to: '', label: 'Dashboard', Icon: LayoutDashboard },
  { to: `.${AppRoutes.SETTINGS}`, label: 'Settings', Icon: Settings },
];

const SERVER_MANAGEMENT_SIDEBAR_MENU = [
  {
    to: `.${AppRoutes.WELCOME}`,
    label: 'Welcome Channel',
    Icon: Hash,
  },
  {
    to: `.${AppRoutes.GREETING}`,
    label: 'Welcome and Goodbye',
    Icon: DoorOpen,
  },
  {
    to: `.${AppRoutes.AUTO_ROLES}`,
    label: 'Auto Roles',
    Icon: BadgePlus,
  },
  {
    to: `.${AppRoutes.MODERATOR}`,
    label: 'Moderator',
    Icon: Shield,
  },
];

export const MONITORING = [
  {
    to: `.${AppRoutes.BAN_ANALYTICS}`,
    label: 'Ban Analytics',
    Icon: PieChart,
  },
  {
    to: `.${AppRoutes.LOGS}`,
    label: 'Logs',
    Icon: ScrollText,
  },
];

export default function DashboardServerLayout() {
  return (
    <>
      <div
        id="sidebar"
        className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col"
      >
        <div className="flex flex-grow flex-col gap-y-5 overflow-y-auto border-r border-[#27272a] px-6 pb-1">
          <Logo className="flex h-16 shrink-0 items-center" />
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <SidebarMenu menu={MAIN_SIDEBAR_MENU} />
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-[#9ca3af]">
                  Server Management
                </div>
                <SidebarMenu
                  menu={SERVER_MANAGEMENT_SIDEBAR_MENU}
                  className="mt-2"
                />
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-[#9ca3af]">
                  Monitoring
                </div>
                <SidebarMenu menu={MONITORING} className="mt-2" />
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-64">
        <Navbar />
        <div className="py-10 px-4 md:px-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </>
  );
}

type SidebarMenu = {
  menu: typeof MAIN_SIDEBAR_MENU;
  className?: string;
};

const SidebarMenu = ({ menu, className }: SidebarMenu) => (
  <ul role="list" className={cn('-m-2', className)}>
    {menu.map(({ label, to, Icon }, i) => (
      <li key={i}>
        <NavLink
          to={to}
          className={({ isActive }) =>
            isActive
              ? 'bg-zinc-800 text-zinc-50 bqg flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold items-center'
              : 'text-zinc-50 hover:bg-zinc-800 hover:text-zinc-50 bqg flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold items-center group'
          }
          end
        >
          <Icon className="group-hover:text-zinc-50 h-5 w-5 shrink-0" />
          {label}
        </NavLink>
      </li>
    ))}
  </ul>
);
