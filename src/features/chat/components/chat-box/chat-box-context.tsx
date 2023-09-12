import { Message, Room } from '../../types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { CursorPagination } from '@/types/api';
import { roomApi } from '../../api/room-api';
import socket from '@/lib/socket';
import { socketConfig } from '@/configs/socket-config';

interface ChatBoxContextProps {
  room: Room;
  messages: Message[];
  loadMoreMessages: () => void;
  hasNextPage: boolean | undefined;
  refetchMessages: () => void;
  addMessage: (message: Message) => void;
  replaceMessage: (message: Message, replaceMessageId: string) => void;
  updateRoom: (room: Room) => void;
}

export const ChatBoxContext = createContext<ChatBoxContextProps>({
  room: {} as Room,
  messages: [],
  loadMoreMessages: () => {},
  hasNextPage: false,
  refetchMessages: () => {},
  addMessage: () => {},
  replaceMessage: () => {},
  updateRoom: () => {},
});

export const ChatBoxProvider = ({
  children,
  room: _room,
}: React.PropsWithChildren<{ room: Room }>) => {
  const [room, setRoom] = useState<Room>(_room);
  const updateRoom = useCallback((room: Room) => {
    setRoom((old) => ({ ...old, ...room }));
  }, []);
  const router = useRouter();
  const queryClient = useQueryClient();
  const key = useMemo(() => ['messages', room._id], [room._id]);
  const { data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: key,
    queryFn: ({ pageParam }) =>
      roomApi.getMessages(room._id, { cursor: pageParam, limit: 16 }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.pageInfo.hasNextPage) return undefined;
      return lastPage.pageInfo.endCursor;
    },
  });

  const messages = useMemo(() => {
    const raw = data?.pages.map((page) => page.items).flat() ?? [];
    return raw.filter(
      (message, index, self) =>
        self.findIndex((m) => m._id === message._id) === index,
    );
  }, [data]);

  const addMessage = useCallback(
    (message: Message) => {
      queryClient.setQueryData<typeof data | undefined>(key, (old) => {
        const newPage: {
          pageInfo: CursorPagination;
          items: Message[];
        } = {
          pageInfo: {
            endCursor: message._id,
            hasNextPage: false,
          },
          items: [message],
        };

        if (!old) {
          return {
            pageParams: [message._id],
            pages: [newPage],
          };
        }
        return {
          ...old,
          pages: [newPage, ...old.pages],
        };
      });
    },
    [queryClient, key],
  );

  const replaceMessage = useCallback(
    (message: Message, replaceMessageId: string) => {
      queryClient.setQueryData<typeof data | undefined>(key, (old) => {
        if (!old) return old;
        let hasReplaceMessage = false;
        const newPage = old?.pages.map((page) => {
          return {
            ...page,
            items: page.items.map((item) => {
              if (item._id === replaceMessageId) {
                hasReplaceMessage = true;
                return {
                  ...item,
                  ...message,
                };
              }
              return item;
            }),
          };
        });
        if (!hasReplaceMessage) {
          newPage.unshift({
            pageInfo: {
              endCursor: message._id,
              hasNextPage: false,
            },
            items: [message],
          });
        }
        return {
          ...old,
          pages: newPage,
        };
      });
    },
    [queryClient, key],
  );

  const updateMessage = useCallback(
    (message: Message) => {
      queryClient.setQueryData<typeof data | undefined>(key, (old) => {
        if (!old) return old;
        const newPage = old?.pages.map((page) => {
          return {
            ...page,
            items: page.items.map((item) =>
              item._id === message._id
                ? {
                    ...item,
                    ...message,
                  }
                : item,
            ),
          };
        });
        return {
          ...old,
          pages: newPage,
        };
      });
    },
    [queryClient, key],
  );

  useEffect(() => {
    socket.emit(socketConfig.events.room.join, room._id);
    socket.on(socketConfig.events.room.delete, (roomId) => {
      if (roomId === room._id) {
        router.push('/talk');
      }
    });
    socket.on(socketConfig.events.room.leave, (roomId) => {
      if (roomId === room._id) {
        router.push('/talk');
      }
    });

    socket.on(
      socketConfig.events.message.new,
      ({
        clientTempId,
        message,
      }: {
        message: Message;
        clientTempId: string;
      }) => {
        replaceMessage(message, clientTempId);
      },
    );
    socket.on(socketConfig.events.message.update, (message: Message) => {
      updateMessage(message);
    });
    return () => {
      socket.off(socketConfig.events.message.new);
      socket.off(socketConfig.events.message.update);
    };
  }, [replaceMessage, room._id, router, updateMessage]);

  return (
    <ChatBoxContext.Provider
      value={{
        room,
        messages,
        hasNextPage,
        loadMoreMessages: fetchNextPage,
        refetchMessages: refetch,
        addMessage,
        replaceMessage,
        updateRoom,
      }}
    >
      {children}
    </ChatBoxContext.Provider>
  );
};
export const useChatBox = () => {
  const context = useContext(ChatBoxContext);
  if (!context) {
    throw new Error('useChatBox must be used within a ChatBoxProvider');
  }
  return context;
};
