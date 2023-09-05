import { Avatar } from '@/components/data-display/avatar';
import { Room } from '@/features/chat/types';
import { generateRoomDisplay } from '@/features/chat/utils';
import { useMemo } from 'react';

export interface InboxItemProps {
  data: Room;
}

export const InboxItem = ({ data: _data }: InboxItemProps) => {
  const data = useMemo(() => generateRoomDisplay(_data, '1'), [_data]);
  return (
    <div className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-all hover:bg-background">
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
              <span className="block">
                <span className="line-clamp-1 break-all font-semibold text-text/90">
                  {data.name}
                </span>
              </span>
            </div>
            <span className="ml-auto pl-2 text-sm text-gray-400">12:00</span>
          </div>
          <div className="text-sm text-gray-400">
            {data.lastMessage?.content}
          </div>
        </div>
      </div>
    </div>
  );
};
