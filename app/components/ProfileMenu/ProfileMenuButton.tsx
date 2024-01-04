import { Form, Link } from '@remix-run/react';
import { useState } from 'react';
import { useOptionalUser } from '~/hooks/useUser';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import ProfileFlyoutMenuControl from './ProfileFlyoutMenuControl';
import { SocialsProvider } from 'remix-auth-socials';
import { AppRoutes } from '~/lib/route';
import DiscordSignInButton from './DiscordSignInButton';

const ProfileMenuButton = () => {
  const [isOpen, setOpen] = useState(false);
  const user = useOptionalUser();

  return (
    <>
      {user ? (
        <DropdownMenu onOpenChange={setOpen}>
          <DropdownMenuTrigger>
            <ProfileFlyoutMenuControl isMenuOpen={isOpen} user={user} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Servers owners</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link className="w-full" to="/dashboard">
                  My servers
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Form className="w-full" action="/logout" method="post">
                  <button className="w-full text-left" type="submit">
                    Logout
                  </button>
                </Form>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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
