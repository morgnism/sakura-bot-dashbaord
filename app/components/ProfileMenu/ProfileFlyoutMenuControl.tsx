import { DiscordUser } from '~/server/auth.server';
import { imageUrlBuilder } from '~/utils/image-url-builder';
import { Icons } from '../icons';

type ProfileFlyoutMenuControl = {
  isMenuOpen: boolean;
  user?: DiscordUser;
};
const ProfileFlyoutMenuControl = ({
  isMenuOpen,
  user,
}: ProfileFlyoutMenuControl) => (
  <div className="flex cursor-pointer items-center p-0 bg-transparent hover:bg-transparent group">
    <img
      src={imageUrlBuilder(user?.id, user?.avatar, { resource: 'avatars' })}
      alt={user?.displayName}
      className="h-8 w-8 rounded-full"
      width="512"
      height="512"
    />
    {isMenuOpen ? (
      <Icons.arrowUp className="mx-1 h-5 transition-all text-zinc-50" />
    ) : (
      <Icons.arrowDown className="mx-1 group-hover:text-zinc-50 text-[#6b7280] h-5 transition-all" />
    )}
  </div>
);

export default ProfileFlyoutMenuControl;
