import { Form } from '@remix-run/react';
import { useState } from 'react';
import { SocialsProvider } from 'remix-auth-socials';
import useOutsideClick from '~/hooks/useClickOutside';
import { useOptionalUser } from '~/hooks/useUser';
import { AppRoutes } from '~/lib/constants';
import DiscordSignInButton from '../Buttons/DiscordSignInButton';
import ProfileFlyoutMenu from './ProfileFlyoutMenu';
import ProfileFlyoutMenuControl from './ProfileFlyoutMenuControl';

type SocialButtonProps = {
  provider: SocialsProvider;
  label: string;
};

const SocialButton: React.FC<SocialButtonProps> = ({ provider, label }) => (
  <Form action={`${AppRoutes.AUTH}/${provider}`} method="post">
    <DiscordSignInButton
      className="rounded-md bg-[#4f46e5] text-sm font-semibold text-white shadow-sm hover:bg-[hsl(239,84%,67%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f46e5]"
      type="submit"
    >
      {label}
    </DiscordSignInButton>
  </Form>
);

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
        <SocialButton
          provider={SocialsProvider.DISCORD}
          label="Sign In With Discord"
        />
      )}
    </>
  );
};

export default ProfileMenuButton;
