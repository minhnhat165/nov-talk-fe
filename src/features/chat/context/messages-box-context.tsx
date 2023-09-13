'use client';

import { Message, Room } from '@/features/chat/types';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react';

import { roomApi } from '@/features/chat/api/room-api';
import socket from '@/lib/socket';
import { socketConfig } from '@/configs/socket-config';
import { useCursorPaginationQuery } from '@/hooks/use-cursor-pagination-query';

interface MessagesBoxContextProps {
  room: Room;
  messages: Message[];
  loadMoreMessages: () => void;
  hasNextPage: boolean | undefined;
  refetchMessages: () => void;
  addMessage: (message: Message) => void;
  replaceMessage: (message: Message, clientTempId: string) => void;
  updateMessage: (message: Message) => void;
  removeMessage: (messageId: string) => void;
}

export const MessagesBoxContext = createContext<MessagesBoxContextProps>(
  {} as MessagesBoxContextProps,
);

export const MessagesBoxProvider = ({
  children,
  room,
}: PropsWithChildren<{ room: Room }>) => {
  const key = useMemo(() => ['messages', room._id], [room._id]);
  const {
    items,
    hasNextPage,
    fetchNextPage,
    addItem,
    updateItem,
    removeItem,
    replaceItem,
  } = useCursorPaginationQuery<Message>({
    queryKey: key,
    queryFn: ({ pageParam }) =>
      roomApi.getMessages(room._id, { cursor: pageParam, limit: 16 }),
  });

  // socket event

  useEffect(() => {
    socket.on(
      socketConfig.events.message.new,
      ({
        clientTempId,
        message,
      }: {
        message: Message;
        clientTempId: string;
      }) => {
        replaceItem(message, clientTempId);
      },
    );
    socket.on(socketConfig.events.message.update, (message: Message) => {
      updateItem(message);
    });

    return () => {
      socket.off(socketConfig.events.message.new);
      socket.off(socketConfig.events.message.update);
    };
  }, [replaceItem, room._id, updateItem]);

  return (
    <MessagesBoxContext.Provider
      value={{
        room,
        messages: items,
        loadMoreMessages: fetchNextPage,
        hasNextPage: hasNextPage,
        refetchMessages: () => {},
        addMessage: addItem,
        replaceMessage: replaceItem,
        updateMessage: updateItem,
        removeMessage: removeItem,
      }}
    >
      {children}
    </MessagesBoxContext.Provider>
  );
};

export const useMessagesBox = () => {
  const context = useContext(MessagesBoxContext);
  if (!context) {
    throw new Error('useMessagesBox must be used within MessagesBoxProvider');
  }
  return context;
};
