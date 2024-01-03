import { NavLink, Outlet } from '@remix-run/react';
import Logo from '~/components/Logo';
import Navbar from '~/components/Navbar';
import { FeatureTypes, Features } from '~/lib/features';
import { AppRoutes } from '~/lib/route';

export const MAIN_SIDEBAR_MENU = [
  { to: './', label: 'Dashboard' },
  { to: `./${AppRoutes.SETTINGS}`, label: 'Settings' },
];

export default function DashboardServerLayout() {
  const SERVER_MANAGEMENT_SIDEBAR_MENU = Features.filter(
    ([_, feature]) => feature.type === FeatureTypes.SERVER_MANAGEMENT
  );

  return (
    <>
      <div
        id="sidebar"
        className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
      >
        <div className="flex flex-grow flex-col gap-y-5 overflow-y-auto border-r border-[#e5e7eb] bg-[#111827] px-6 pb-1">
          <Logo className="flex h-16 shrink-0 items-center" />
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-m-2 abo">
                  {MAIN_SIDEBAR_MENU.map(({ label, to }, i) => (
                    <li key={i}>
                      <NavLink
                        to={to}
                        className={({ isActive, isPending }) =>
                          isActive
                            ? 'bg-[#1f2937] text-white bqg flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            : isPending
                            ? ''
                            : 'hover:bg-[#1f2937] text-[#9ca3af] hover:text-white bqg flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          className="text-[#9ca3af] hover:text-white h-6 w-6 shrink-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                          ></path>
                        </svg>
                        {label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-[#9ca3af]">
                  Server Management
                </div>
                <ul role="list" className="-m-2 mt-2">
                  {SERVER_MANAGEMENT_SIDEBAR_MENU.map(
                    ([key, { label, to }]) => (
                      <li key={key}>
                        <NavLink
                          to={to}
                          className={({ isActive, isPending }) =>
                            isActive
                              ? 'bg-[#1f2937] text-white bqg flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                              : isPending
                              ? ''
                              : 'hover:bg-[#1f2937] text-[#9ca3af] hover:text-white bqg flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="text-[#9ca3af] hover:text-white h-6 w-6 shrink-0"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            ></path>
                          </svg>
                          {label}
                        </NavLink>
                      </li>
                    )
                  )}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        <Navbar />
        <div className="py-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}
