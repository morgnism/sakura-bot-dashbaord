import { Form, Link } from '@remix-run/react';
import { RefObject } from 'react';

type ProfileFlyoutMenuProps = {
  menuRef: RefObject<HTMLDivElement>;
  closeMenu: () => void;
};

const ProfileFlyoutMenu = ({ menuRef, closeMenu }: ProfileFlyoutMenuProps) => (
  <div
    ref={menuRef}
    className="pointer-events-auto absolute right-0 top-[calc(100%+8px)] w-[228px] rounded-lg bg-[#17181e] p-2 transition-all"
  >
    <h4 className="p-3 text-xs font-bold uppercase text-[#f2f4fb]">
      Servers owners
    </h4>
    <Link to="/dashboard" onClick={closeMenu}>
      <div className="relative cursor-pointer whitespace-nowrap rounded-lg bg-transparent px-3 py-2.5 text-sm text-[#9195ab] transition-all hover:bg-[#1f2129]">
        My servers
      </div>
    </Link>
    <div className="px-3 py-2.5">
      <div className="h-px w-full bg-[#313442]"></div>
    </div>
    <Form action="/logout" method="post">
      <div className="relative cursor-pointer whitespace-nowrap rounded-lg bg-transparent text-sm text-[#9195ab] transition-all hover:bg-[#1f2129]">
        <button className="w-full px-3 py-2.5 text-left">Logout</button>
      </div>
    </Form>
  </div>
);

export default ProfileFlyoutMenu;