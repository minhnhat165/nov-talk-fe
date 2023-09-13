import { forwardRef, memo, useEffect, useMemo } from 'react';

import { Button } from '@/components/actions/button';
import { InboxItem } from '@/features/chat/components/inbox-item';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Room } from '../../types';
import { Typography } from '@/components/data-display';
import { cn } from '@/lib/utils';
import { inboxTypeMap } from './inbox-main-tab';
import { roomApi } from '@/features/chat/api/room-api';
import socket from '@/lib/socket';
import { socketConfig } from '@/configs/socket-config';
import useAuthStore from '@/features/auth/stores/use-auth-store';
import { useInboxContext } from './inbox-context';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useScrollDistanceFromTop } from '@/hooks/use-scroll-distance-from-top';
import useStore from '@/stores/use-store';

interface InboxListProps {
  type: keyof typeof inboxTypeMap;
}

const InboxList = forwardRef<HTMLDivElement, InboxListProps>(
  ({ type }: InboxListProps, ref) => {
    const currentUserId = useStore(useAuthStore, (s) => s.user?._id);
    const { setCurrentTab } = useInboxContext();
    const params = useParams();
    const currentRoomId = params?.id;
    const { isScrolled, ref: scrollRef } = useScrollDistanceFromTop(1);
    const key = useMemo(() => ['rooms', type], [type]);

    const { data, refetch, fetchNextPage, hasNextPage, isLoading } =
      useInfiniteQuery({
        queryKey: key,
        queryFn: ({ pageParam }) =>
          roomApi.getRooms({ cursor: pageParam, limit: 10, type }),
        getNextPageParam: (lastPage) => {
          if (!lastPage.pageInfo.hasNextPage) return undefined;
          return lastPage.pageInfo.endCursor;
        },
      });

    const rooms = useMemo(() => {
      return data?.pages.map((page) => page.items).flat() ?? [];
    }, [data]);

    const updateRoom = (room: Partial<Room>) => {
      // will be updated in the future, not refetch but update the data

      refetch();
    };

    const deleteRoom = (roomId: string) => {
      // will be updated in the future, not refetch but update the data
      refetch();
    };

    const leaveRoom = (roomId: string) => {
      // will be updated in the future, not refetch but update the data
      refetch();
    };

    useEffect(() => {
      socket.on(
        socketConfig.events.room.update,
        (payload: { roomId: string; data: Partial<Room> }) => {
          updateRoom(payload.data);
        },
      );
      socket.on(socketConfig.events.room.delete, (roomId: string) => {
        deleteRoom(roomId);
      });
      socket.on(socketConfig.events.room.leave, (roomId: string) => {
        leaveRoom(roomId);
      });
      return () => {
        socket.off(socketConfig.events.room.update);
      };
    }, []);

    if (rooms.length === 0 && !isLoading) {
      return (
        <div className="bg-card px-4">
          <Typography variant="h3">Welcome to your inbox!</Typography>
          <Typography variant="muted" className="text-lg">
            Create a new conversation to get started.
          </Typography>

          <div>
            <Button
              onClick={() => {
                setCurrentTab('create');
              }}
              className="mt-2"
              color="primary"
              shape="circle"
            >
              New conversation
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className="h-full w-full overflow-hidden">
        <div
          id="scrollableDiv"
          ref={scrollRef}
          className={cn(
            'h-full gap-2 overflow-y-scroll pl-2 pr-1',
            isScrolled && 'border-t',
          )}
        >
          <InfiniteScroll
            scrollableTarget="scrollableDiv"
            dataLength={rooms.length}
            next={fetchNextPage}
            hasMore={hasNextPage || false}
            loader={<h4>Loading...</h4>}
            refreshFunction={refetch}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            className="flex flex-col"
            pullDownToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>
                &#8595; Pull down to refresh
              </h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>
                &#8593; Release to refresh
              </h3>
            }
          >
            {rooms.map((room) => (
              <InboxItem
                key={room._id}
                data={room}
                isActive={currentRoomId === room._id}
                currentUserId={currentUserId!}
                currentRoomId={currentRoomId as string}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  },
);

InboxList.displayName = 'InboxList';

export default memo(InboxList);
