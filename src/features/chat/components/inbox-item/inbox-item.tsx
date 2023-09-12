import { forwardRef, memo, useMemo } from 'react';

import { InboxItemMenu } from './inbox-item-menu';
import { ItemAvatar } from '@/features/chat/components/inbox-item/inbox-item-avatar';
import { ItemSub } from '@/features/chat/components/inbox-item/inbox-item-sub';
import Link from 'next/link';
import { Room } from '@/features/chat/types';
import { User } from '@/features/user/types';
import { cn } from '@/lib/utils';
import { generateRoomDisplay } from '@/features/chat/utils';
import moment from 'moment';

export interface InboxItemProps {
  data: Room;
  isActive?: boolean;
  currentUserId: User['_id'];
  currentRoomId?: Room['_id'];
}
const InboxItem = forwardRef<HTMLDivElement, InboxItemProps>(
  ({ data: _data, isActive, currentUserId, currentRoomId }, ref) => {
    const data = useMemo(
      () => generateRoomDisplay(_data, currentUserId),
      [_data, currentUserId],
    );

    const time = useMemo(() => {
      if (data.newMessageAt) {
        return moment(data.newMessageAt).fromNow(true);
      }
      return '';
    }, [data.newMessageAt]);

    return (
      <Link href={data.link!}>
        <div
          ref={ref}
          className={cn(
            'group relative flex cursor-pointer items-center justify-between rounded-lg p-2 transition-all',
            data.link === `/talk/${currentRoomId}` || isActive
              ? 'bg-gradient-to-br from-primary/30 to-primary/5 shadow'
              : 'bg-transparent hover:bg-background/75',
          )}
        >
          <div className="flex w-full items-center gap-2">
            <ItemAvatar room={data} />
            <div className="w-full">
              <div className="flex items-center justify-between">
                <div className="max-w-full">
                  <span className="line-clamp-1 break-all font-semibold text-text/90">
                    {data.name}
                  </span>
                </div>
                {data.newMessageAt && (
                  <span className="ml-auto shrink-0 pl-2 text-sm text-text/50">
                    {time}
                  </span>
                )}
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
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100">
            <InboxItemMenu room={data} />
          </div>
        </div>
      </Link>
    );
  },
);

InboxItem.displayName = 'InboxItem';

export const MemoizedInboxItem = memo(InboxItem);
