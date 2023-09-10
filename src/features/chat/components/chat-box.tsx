'use client';

import {
  CameraIcon,
  DocumentIcon,
  InformationCircleIcon,
  MicrophoneIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  PhotoIcon,
  PlusCircleIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/solid';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/data-display/popover';
import { useMemo, useState } from 'react';

import { Button } from '@/components/actions/button';
import { InboxItemAvatar } from '@/features/chat/components/inbox-item';
import { MessageBox } from '@/features/chat/components/message-box';
import { Room } from '@/features/chat/types';
import { Typography } from '@/components/data-display';
import { generateRoomDisplay } from '../utils';
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
        <MessageBox room={props.room} />
        <div className="flex h-20 w-full items-center justify-center bg-primary/5 px-10">
          <ChatInput />
        </div>
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

const ChatInput = () => {
  return (
    <div className=" flex w-full items-center gap-2">
      <div className="flex h-14 flex-1 items-center gap-2 rounded-lg bg-card p-2 shadow-sm">
        <Popover>
          <PopoverTrigger asChild>
            <Button.Icon size="md" variant="ghost" shape="circle">
              <PlusCircleIcon />
            </Button.Icon>
          </PopoverTrigger>
          <PopoverContent
            className="w-fit p-2"
            align="start"
            sideOffset={16}
            alignOffset={-8}
          >
            <Button.Icon size="sm" variant="ghost" shape="circle">
              <CameraIcon />
            </Button.Icon>
            <Button.Icon size="sm" variant="ghost" shape="circle">
              <PhotoIcon />
            </Button.Icon>
            <Button.Icon size="sm" variant="ghost" shape="circle">
              <DocumentIcon />
            </Button.Icon>
            <Button.Icon size="sm" variant="ghost" shape="circle">
              <MicrophoneIcon />
            </Button.Icon>
          </PopoverContent>
        </Popover>
        <input
          type="text"
          className="flex-1 bg-transparent outline-none"
          placeholder="Type a message"
        />
      </div>
      <Button.Icon size="lg" shape="circle" className="shrink-0">
        <PaperAirplaneIcon />
      </Button.Icon>
    </div>
  );
};
