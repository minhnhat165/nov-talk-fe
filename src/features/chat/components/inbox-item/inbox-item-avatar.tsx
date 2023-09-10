import { Avatar } from '@/components/data-display/avatar';
import { Room } from '@/features/chat/types';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const avatarStyleSizeMapByLength: Record<number, string> = {
  1: 'w-12 h-12 ring-0',
  2: 'w-10 h-10',
  3: 'w-8 h-8 ring-2',
  4: 'w-6 h-6 ring-1',
};

const avatarStylePositionMapByLengthAndIndex: Record<
  number,
  {
    [key: number]: string;
  }
> = {
  1: {
    0: 'top-0 left-0',
  },
  2: {
    0: 'top-0 left-0',
    1: 'bottom-0 right-0',
  },
  3: {
    0: 'top-0 left-1/2 transform -translate-x-1/2',
    1: 'bottom-0 left-0',
    2: 'bottom-0 right-0',
  },
  4: {
    0: 'top-0 left-0',
    1: 'top-0 right-0',
    2: 'bottom-0 left-0',
    3: 'bottom-0 right-0',
  },
};

type Avatar = {
  src: string;
  alt: string;
};

const MAX_AVATAR_COUNT = 4;

export const ItemAvatar = ({ room }: { room: Room }) => {
  const avatars = useMemo(() => {
    const avatars: Avatar[] = [];
    const participants = room.participants;
    if (room.avatar) {
      avatars.push({
        src: room.avatar,
        alt: room.name ?? '',
      });
      return avatars;
    }
    if (participants.length === 1) {
      avatars.push({
        src: participants[0].avatar!,
        alt: participants[0].name,
      });
    } else if (participants.length > 1) {
      participants.forEach((participant) => {
        avatars.push({
          src: participant.avatar!,
          alt: participant.name,
        });
      });
    }
    return avatars;
  }, [room.participants, room.avatar, room.name]);
  const avatarsDisplay = useMemo(() => {
    if (avatars.length > MAX_AVATAR_COUNT) {
      return avatars.slice(0, MAX_AVATAR_COUNT);
    }
    return avatars;
  }, [avatars]);
  return (
    <div className="relative aspect-square h-12">
      {avatarsDisplay.map((avatar, index) => (
        <Avatar
          key={index}
          alt={avatar.alt}
          src={avatar.src}
          className={cn(
            'absolute ring-background',
            avatarStyleSizeMapByLength[avatarsDisplay.length],
            avatarStylePositionMapByLengthAndIndex[avatarsDisplay.length][
              avatars.indexOf(avatar)
            ],
          )}
        />
      ))}
      {avatars.length > MAX_AVATAR_COUNT && (
        <div
          className={cn(
            'absolute flex h-full w-full items-center justify-center  rounded-full bg-card text-sm font-semibold text-text/50 ring-background',
            avatarStyleSizeMapByLength[avatarsDisplay.length],
            avatarStylePositionMapByLengthAndIndex[avatarsDisplay.length][
              MAX_AVATAR_COUNT - 1
            ],
          )}
        >
          +{avatars.length - MAX_AVATAR_COUNT}
        </div>
      )}
    </div>
  );
};
