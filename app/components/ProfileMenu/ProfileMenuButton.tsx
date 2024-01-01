import { Form } from '@remix-run/react';
import { useState } from 'react';
import { SocialsProvider } from 'remix-auth-socials';
import useOutsideClick from '~/hooks/useClickOutside';
import { useOptionalUser } from '~/hooks/useUser';
import { AppRoutes } from '~/lib/route';
import DiscordSignInButton from './DiscordSignInButton';
import ProfileFlyoutMenu from './ProfileFlyoutMenu';
import ProfileFlyoutMenuControl from './ProfileFlyoutMenuControl';

const ProfileMenuButton = () => {
  const [isOpen, setOpen] = useState(false);
  const user = useOptionalUser();

  const menuRef = useOutsideClick(() => {
    setOpen(false);
  });

  return (
    <>
      {user ? (
        <div className="relative z-10 ">
          <ProfileFlyoutMenuControl
            isMenuOpen={isOpen}
            user={user}
            openMenu={() => setOpen(true)}
          />
          {isOpen && (
            <ProfileFlyoutMenu
              menuRef={menuRef}
              closeMenu={() => setOpen(false)}
            />
          )}
        </div>
      ) : (
        <Form
          action={`${AppRoutes.AUTH}/${SocialsProvider.DISCORD}`}
          method="post"
        >
          <DiscordSignInButton />
        </Form>
      )}
    </>
  );
};

export default ProfileMenuButton;
