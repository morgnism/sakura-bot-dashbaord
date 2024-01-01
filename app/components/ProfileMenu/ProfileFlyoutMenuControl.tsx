import { DiscordUser } from '~/type';
import { cn } from '~/utils/cn';
import { imageUrlBuilder } from '~/utils/image-url-builder';
import Button from '../Button';

type ProfileFlyoutMenuControl = {
  id?: string;
  isMenuOpen: boolean;
  user: DiscordUser;
  openMenu: () => void;
};
const ProfileFlyoutMenuControl = ({
  isMenuOpen,
  user,
  openMenu,
}: ProfileFlyoutMenuControl) => (
  <Button
    type="button"
    className="flex cursor-pointer items-center py-1"
    onClick={openMenu}
  >
    <img
      src={imageUrlBuilder(user.id, user.avatar, { resource: 'avatars' })}
      alt={user.displayName}
      className="h-8 w-8 rounded-full"
      width="512"
      height="512"
    />
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'ml-1 mr-1 text-[#c6c8d7] transition-all',
        isMenuOpen ? 'scale-100' : '-scale-100'
      )}
    >
      <path
        d="M7 14.5l5-5 5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  </Button>
);

export default ProfileFlyoutMenuControl;
