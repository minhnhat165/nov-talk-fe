'use client';

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Room } from '@/features/chat/types';
import socket from '@/lib/socket';
import { socketConfig } from '@/configs/socket-config';
import { useRouter } from 'next/navigation';

interface ChatBoxContextProps {
  room: Room;
  updateRoom: (room: Room) => void;
}

export const ChatBoxContext = createContext<ChatBoxContextProps>(
  {} as ChatBoxContextProps,
);

export const ChatBoxProvider = ({
  children,
  room: _room,
}: PropsWithChildren<{ room: Room }>) => {
  const [room, setRoom] = useState<Room>(_room);
  const updateRoom = useCallback((room: Room) => {
    setRoom((old) => ({ ...old, ...room }));
  }, []);
  const router = useRouter();

  // socket events

  const handleForceLeaveRoom = useCallback(
    (roomId: string) => {
      if (roomId === room._id) {
        router.push('/talk');
      }
    },
    [room._id, router],
  );

  useEffect(() => {
    socket.emit(socketConfig.events.room.join, room._id);
    socket.on(socketConfig.events.room.update, updateRoom);
    socket.on(socketConfig.events.room.delete, handleForceLeaveRoom);
    socket.on(socketConfig.events.room.leave, handleForceLeaveRoom);
    return () => {
      socket.off(socketConfig.events.room.update, updateRoom);
      socket.off(socketConfig.events.room.delete);
      socket.off(socketConfig.events.room.leave);
      socket.emit(socketConfig.events.room.leave, room._id);
    };
  }, [handleForceLeaveRoom, room._id, updateRoom]);

  return (
    <ChatBoxContext.Provider value={{ room, updateRoom }}>
      {children}
    </ChatBoxContext.Provider>
  );
};

export const useChatBox = () => {
  const context = useContext(ChatBoxContext);
  if (!context) {
    throw new Error('useChatBox must be used within ChatBoxProvider');
  }
  return context;
};
