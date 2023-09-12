import { forwardRef, memo, useEffect, useMemo } from 'react';

import { InboxItem } from '@/features/chat/components/inbox-item';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Room } from '../types';
import { cn } from '@/lib/utils';
import { inboxTypeMap } from './inbox/inbox-main-tab';
import { roomApi } from '@/features/chat/api/room-api';
import socket from '@/lib/socket';
import { socketConfig } from '@/configs/socket-config';
import useAuthStore from '@/features/auth/stores/use-auth-store';
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
    const params = useParams();
    const currentRoomId = params?.id;
    const { isScrolled, ref: scrollRef } = useScrollDistanceFromTop(1);
    const key = useMemo(() => ['rooms', type], [type]);

    const { data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery({
      queryKey: key,
      queryFn: ({ pageParam }) =>
        roomApi.getRooms({ cursor: pageParam, limit: 10, type }),
      getNextPageParam: (lastPage) => lastPage.pageInfo.endCursor,
    });

    const rooms = useMemo(() => {
      return data?.pages.map((page) => page.items).flat() ?? [];
    }, [data]);

    const updateRoom = (room: Partial<Room>) => {
      refetch();
    };

    useEffect(() => {
      socket.on(
        socketConfig.events.room.update,
        (payload: { roomId: string; data: Partial<Room> }) => {
          updateRoom(payload.data);
        },
      );
      return () => {
        socket.off(socketConfig.events.room.update);
      };
    }, []);

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
