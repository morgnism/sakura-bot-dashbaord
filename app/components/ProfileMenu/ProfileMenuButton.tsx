import { Form } from '@remix-run/react';
import { useState } from 'react';
import { SocialsProvider } from 'remix-auth-socials';
import useOutsideClick from '~/hooks/useClickOutside';
import { AppRoutes } from '~/lib/constants';
import Button from '../Button';
import ProfileFlyoutMenu from './ProfileFlyoutMenu';
import ProfileFlyoutMenuControl from './ProfileFlyoutMenuControl';
import { useGetUser } from '~/hooks/useGetUser';

interface SocialButtonProps {
  provider: SocialsProvider;
  label: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ provider, label }) => (
  <Form action={`${AppRoutes.AUTH}/${provider}`} method="post">
    <Button
      className="rounded-md bg-[#4f46e5] text-sm font-semibold text-white shadow-sm hover:bg-[hsl(239,84%,67%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f46e5]"
      type="submit"
    >
      {label}
    </Button>
  </Form>
);

const ProfileMenuButton = () => {
  const [isOpen, setOpen] = useState(false);
  const user = useGetUser();

  const menuRef = useOutsideClick(() => {
    setOpen(false);
  });

  console.log(isOpen);

  return (
    <div className="flex items-center">
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
    </div>
  );
};

export default ProfileMenuButton;
