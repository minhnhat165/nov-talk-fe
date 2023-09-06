import { Message, Room } from '@/features/chat/types';
import { forwardRef, useMemo } from 'react';

import { Avatar } from '@/components/data-display/avatar';
import { Typography } from '@/components/data-display';
import { User } from '@/features/user/types/user';
import { cn } from '@/lib/utils';
import { generateRoomDisplay } from '@/features/chat/utils';
import { usersData } from '@/data/user';

export interface InboxItemProps {
  data: Room;
  isActive?: boolean;
}

export const InboxItem = forwardRef<HTMLDivElement, InboxItemProps>(
  ({ data: _data, isActive }, ref) => {
    const currentUserId = usersData[0]._id;
    const data = useMemo(
      () => generateRoomDisplay(_data, currentUserId),
      [_data, currentUserId],
    );
    return (
      <div
        ref={ref}
        className={cn(
          'flex cursor-pointer items-center justify-between rounded-md p-2 transition-all',
          isActive
            ? 'bg-gradient-to-br from-primary/30 to-primary/5 shadow'
            : 'bg-transparent hover:bg-background/75',
        )}
      >
        <div className="flex w-full items-center gap-2">
          <Avatar
            alt="John Doe"
            size="lg"
            className="shrink-0"
            src={data.avatar!}
          />
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div className="max-w-full">
                <span className="line-clamp-1 break-all font-semibold text-text/90">
                  {data.name}
                </span>
              </div>
              <span className="ml-auto pl-2 text-sm text-text/50">12:00</span>
            </div>
            {data.lastMessage && (
              <ItemSub
                message={data.lastMessage}
                participants={data.participants}
                currentUserId={currentUserId}
              />
            )}
          </div>
        </div>
      </div>
    );
  },
);

InboxItem.displayName = 'InboxItem';

const ItemSub = ({
  message,
  participants,
  currentUserId,
}: {
  message: Message;
  participants: User[];
  currentUserId: User['_id'];
}) => {
  const readBy = message?.readBy || [];
  const participantsById = useMemo(() => {
    return participants.reduce(
      (acc, cur) => {
        acc[cur._id] = cur;
        return acc;
      },
      {} as Record<string, User>,
    );
  }, [participants]);

  const isRead = readBy.includes(currentUserId);

  const preMessage = useMemo(() => {
    if (message.sender._id === currentUserId) {
      return 'You:';
    }
    if (participants.length > 2) {
      return `${message.sender.name}:`;
    }
    return '';
  }, [
    message.sender._id,
    message.sender.name,
    currentUserId,
    participants.length,
  ]);

  return (
    <div className="flex items-center">
      <Typography
        className={cn(
          'line-clamp-1 break-all text-sm',
          isRead ? 'text-text/50' : 'font-bold  text-text/90',
        )}
      >
        {preMessage} {message?.content}
      </Typography>
      {readBy.length > 0 && (
        <div className="ml-auto flex items-center pl-2">
          {readBy.map((userId) => {
            if (
              userId === currentUserId ||
              !participantsById[userId] ||
              message.sender._id === userId ||
              message.sender._id !== currentUserId
            ) {
              return null;
            }
            return (
              <div key={userId} className="shrink-0">
                <Avatar
                  alt={participantsById[userId].name}
                  src={participantsById[userId].avatar}
                  className="h-4 w-4"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
