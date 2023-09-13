'use client';

import {
  InformationCircleIcon,
  PhoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/solid';
import { useMemo, useState } from 'react';

import { Button } from '@/components/actions/button';
import { ChatBoxFooter } from './chat-box-footer';
import { ChatBoxProvider } from './chat-box-context';
import { InboxItemAvatar } from '@/features/chat/components/inbox-item';
import { MessageBox } from '@/features/chat/components/chat-box/message-box';
import { Room } from '@/features/chat/types';
import { Typography } from '@/components/data-display';
import { generateRoomDisplay } from '@/features/chat/utils';
import useAuthStore from '@/features/auth/stores/use-auth-store';

export interface ChatBoxProps {
  room: Room;
}

export const ChatBox = (props: ChatBoxProps) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="flex h-full">
      <div className="flex h-full w-full flex-col overflow-hidden">
        <Header room={props.room} />
        <ChatBoxProvider room={props.room}>
          <MessageBox room={props.room} />
          <div className="flex min-h-[5rem] w-full items-center justify-center bg-primary/5 px-10">
            <ChatBoxFooter />
          </div>
        </ChatBoxProvider>
      </div>
      {showSidebar && (
        <div className="w-[22.5rem] shrink-0 rounded-lg border-l bg-card"></div>
      )}
    </div>
  );
};

const Header = ({ room: _room }: { room: Room }) => {
  const currentUserId = useAuthStore((s) => s.user?._id) || '';
  const room = useMemo(
    () => generateRoomDisplay(_room, currentUserId),
    [_room, currentUserId],
  );
  return (
    <div className="flex w-full items-center border-b px-4 py-2">
      <div className="flex items-center gap-2">
        <InboxItemAvatar room={room} />
        <div>
          <Typography variant="h4">{room.name}</Typography>
        </div>
      </div>
      <div className="-mr-2 ml-auto">
        <ActionBar />
      </div>
    </div>
  );
};

const ActionBar = () => {
  return (
    <div>
      <Button.Icon size="sm" variant="ghost" shape="circle">
        <PhoneIcon />
      </Button.Icon>
      <Button.Icon size="sm" variant="ghost" shape="circle">
        <VideoCameraIcon />
      </Button.Icon>
      <Button.Icon size="sm" variant="ghost" shape="circle">
        <InformationCircleIcon />
      </Button.Icon>
    </div>
  );
};
