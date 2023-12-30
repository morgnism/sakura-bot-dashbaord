import { LoaderFunctionArgs, json } from '@remix-run/node';
import { NavLink, Outlet } from '@remix-run/react';
import invariant from 'tiny-invariant';
import Logo from '~/components/Logo';
import Navbar from '~/components/Navbar';
import RouteLayout from '~/components/Wrappers/RouteLayout';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.serverId, 'Missing serverId param');
  return json({});
};

const MAIN_MENU_ITEMS = [
  { to: '', label: 'Dashboard' },
  { to: './settings', label: 'Settings' },
];

export default function DashboardServerLayout() {
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
                  {MAIN_MENU_ITEMS.map(({ label, to }, i) => (
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
                  <li>
                    <NavLink
                      to="./settings"
                      className="hover:bg-[#1f2937] text-[#9ca3af] hover:text-white bqg flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
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
                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      Settings
                    </NavLink>
                  </li>
                </ul>
              </li>
              {/* <li>
                <div className="text-xs font-semibold leading-6 text-[#9ca3af]">
                  Your teams
                </div>
                <ul role="list" className="-m-2 mt-2 abo">
                  <li>
                    <a
                      href="#"
                      className="text-[#374151] hover:text-[#4f46e5] hover:bg-[#f9fafb] bqg flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    >
                      <span className="text-[#9ca3af] border-[#e5e7eb] bqj brs flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-xs font-medium bg-white">
                        H
                      </span>
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        Heroicons
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#374151] hover:text-[#4f46e5] hover:bg-[#f9fafb] bqg flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    >
                      <span className="text-[#9ca3af] border-[#e5e7eb] bqj brs flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-xs font-medium bg-white">
                        T
                      </span>
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        Tailwind Labs
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#374151] hover:text-[#4f46e5] hover:bg-[#f9fafb] bqg flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    >
                      <span className="text-[#9ca3af] border-[#e5e7eb] bqj brs flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-xs font-medium bg-white">
                        W
                      </span>
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        Workcation
                      </span>
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        <Navbar />
        <RouteLayout className="py-10">
          <Outlet />
        </RouteLayout>
      </div>
    </>
  );
}
