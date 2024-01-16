import { Trash2 } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { nowDateFormat } from '~/utils/date-format';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

type EmbedProps = {};

export const EmbedContainer = ({ children }: PropsWithChildren<EmbedProps>) => {
  return (
    <div className="flex">
      <div className="mr-4 w-10">
        <img
          src="https://cdn.discordapp.com/avatars/1164366990140526714/6b2fa7bea50796dcb43aa049fb8b8b68.webp"
          alt="Profile Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div>
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

type EmbedBodyProps = {
  onRemove: () => void;
};

export const EmbedBody = ({
  onRemove,
  children,
}: PropsWithChildren<EmbedBodyProps>) => {
  return (
    <div className="my-2 flex">
      <div
        className="w-1 shrink-0 bg-[#202225] rounded-l"
        style={{ backgroundColor: '#0099ff' }}
      ></div>
      <div className="flex flex-col p-4 bg-[#2C2F33] rounded-r w-full lg:w-[530px] mr-5">
        {children}
      </div>
      <Button type="button" variant="destructive" onClick={() => onRemove()}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

// type EmbedThumbnailProps = {}

// const EmbedThumbnail = (props: EmbedThumbnailProps) => {
//   return (
//     <div>
//       <img
//         className="max-w-[80px] max-h-[80px] ml-4 rounded-md"
//         src="https://i.imgur.com/AfFp7pu.png"
//         alt=""
//       ></img>
//     </div>
//   );
// };

// type EmbedFooter = {};

// const EmbedFooter = (props: EmbedFooter) => {
//   return (
//     <div className="flex items-center mt-2 text-xs text-[#72767d]">
//       <img
//         className="shrink-0 w-5 h-5 mr-2 rounded-full"
//         src="https://i.imgur.com/AfFp7pu.png"
//         alt=""
//       />
//       <span>
//         <span>Some footer text here</span>
//         <span className="text-[#3b3c42] font-bold mx-2">•</span>
//         <span>01/01/2018</span>
//       </span>
//     </div>
//   );
// };
