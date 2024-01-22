import { format } from 'date-fns';
import { PropsWithChildren, useMemo } from 'react';
import { Badge } from '../ui/badge';

export const EmbedContainer = ({ children }: PropsWithChildren) => {
  const nowDateFormat = useMemo(
    () => format(new Date(), "'Today at' HH:mm a"),
    []
  );

  return (
    <div className="flex">
      <div className="mr-4 w-10">
        <img
          src="https://cdn.discordapp.com/avatars/1164366990140526714/6b2fa7bea50796dcb43aa049fb8b8b68.webp"
          alt="Profile Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <span className="font-bold">Sakura Bot</span>
          <Badge className="rounded-[4px] text-[10px] flex items-center gap-1 mx-2 py-0 px-0.5 text-zinc-50 bg-[#5865F2]">
            <span className="font-light">BOT</span>
          </Badge>
          <time className="text-white opacity-45 text-xs">{nowDateFormat}</time>
        </div>

        {children}
      </div>
    </div>
  );
};
