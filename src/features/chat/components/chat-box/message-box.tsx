'use client';

import { useMemo, useRef } from 'react';

import { ArrowDownIcon } from '@heroicons/react/24/solid';
import { Avatar } from '@/components/data-display/avatar';
import { Button } from '@/components/actions/button';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Message } from '@/features/chat/types/message';
import { MessageItem } from '@/features/chat/components/message/message-item';
import { MessageItemGroup } from '../message/message-group';
import { Room } from '@/features/chat/types/room';
import { Spinner } from '@/components/feedback/spinner';
import { User } from '@/features/user/types/user';
import { formatTimeDisplay } from '../../utils';
import { getReadByUsers } from '@/features/chat/utils/get-read-by-users';
import moment from 'moment';
import useAuthStore from '@/features/auth/stores/use-auth-store';
import { useMessagesBox } from '../../context/messages-box-context';
import { useScrollDistanceFromTop } from '@/hooks/use-scroll-distance-from-top';
import { useScrollIntoView } from '@/hooks/use-scroll-into-view';

const maxTimeDiff = 5; // 5 minutes
const maxTimeGroupDiff = 10; // 10 minutes
type MessageGroup = {
  messages: Message[];
  lastMessage: Message;
};
export const MessageBox = ({ room }: { room: Room }) => {
  const currentUserId = useAuthStore((s) => s.user?._id);
  const { hasNextPage, loadMoreMessages, refetchMessages, messages } =
    useMessagesBox();

  const { ref, isScrolled } = useScrollDistanceFromTop(0, true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { scrollIntoView } = useScrollIntoView(bottomRef);

  const { messagesGroup, userAtMessage } = useMemo(() => {
    const userAtMessageRaw = room.participants.map(
      (participant) =>
        ({
          messageId: null,
          user: participant,
        }) as { messageId: Message['_id'] | null; user: User },
    );
    const data = messages.reduce((acc, message) => {
      getReadByUsers({
        currentUserId: '1',
        readBy: message.readBy ?? [],
        participants: room.participants,
        senderId: message.sender._id,
      }).forEach((user) => {
        const userAtMessageIndex = userAtMessageRaw.findIndex(
          (u) => u.user._id === user._id,
        );
        if (
          userAtMessageIndex !== -1 &&
          !userAtMessageRaw[userAtMessageIndex].messageId
        ) {
          userAtMessageRaw[userAtMessageIndex].messageId = message._id;
        }
      });
      if (acc.length === 0) {
        acc.push({
          messages: [message],
          lastMessage: message,
        });
        return acc;
      }
      const lastGroup = acc[acc.length - 1];
      const lastMessage = lastGroup.lastMessage;
      // if last message is not from the same sender
      if (lastMessage.sender._id !== message.sender._id) {
        acc.push({
          messages: [message],
          lastMessage: message,
        });
        return acc;
      }
      // if last message is from the same sender but time diff is too big
      const timeDiff = moment(lastMessage.createdAt).diff(
        moment(message.createdAt),
        'minute',
      );
      if (timeDiff > maxTimeDiff) {
        acc.push({
          messages: [message],
          lastMessage: message,
        });
      } else {
        lastGroup.messages.push(message);
        lastGroup.lastMessage = message;
      }
      return acc;
    }, [] as MessageGroup[]);

    return {
      messagesGroup: data,
      userAtMessage: userAtMessageRaw.reduce(
        (acc, userAtMessage) => {
          if (userAtMessage.messageId) {
            acc[userAtMessage.messageId] = [
              ...(acc[userAtMessage.messageId] ?? []),
              userAtMessage.user,
            ];
          }
          return acc;
        },
        {} as { [key: Message['_id']]: User[] },
      ),
    } as {
      messagesGroup: MessageGroup[];
      userAtMessage: {
        [key: Message['_id']]: User[];
      };
    };
  }, [messages, room.participants]);
  return (
    <div className="relative flex h-full w-full flex-1 overflow-hidden">
      <div
        ref={ref}
        id="inbox-list"
        className="flex w-full flex-1 flex-col-reverse gap-2 overflow-y-scroll bg-primary/5 px-4 py-4"
      >
        <div ref={bottomRef} className="h-1 w-1" />

        <InfiniteScroll
          scrollableTarget="inbox-list"
          dataLength={messagesGroup.length}
          next={loadMoreMessages}
          hasMore={hasNextPage || false}
          loader={
            <div className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full bg-primary/10 p-2 text-primary">
              <Spinner size="lg" />
            </div>
          }
          refreshFunction={refetchMessages}
          inverse={true}
          scrollThreshold={0.7}
          className="flex flex-col-reverse gap-2"
        >
          {messagesGroup.map((group, index) => {
            const timeDiff = moment(moment(group.lastMessage.createdAt)).diff(
              messagesGroup[index + 1]?.messages[0].createdAt ?? moment(),
              'minute',
            );
            const isShowTimeGroup = timeDiff > maxTimeGroupDiff;
            const isMe = group.lastMessage.sender._id === currentUserId;
            return (
              <div key={group.lastMessage._id}>
                {isShowTimeGroup && (
                  <div className="my-4 flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <div className="h-[1px] w-16 bg-primary/30" />
                      <div className="text-sm text-primary/60">
                        {formatTimeDisplay(group.lastMessage.createdAt!)}
                      </div>
                      <div className="h-[1px] w-16 bg-primary/30" />
                    </div>
                  </div>
                )}
                {!isMe && room.isGroup && (
                  <div className="pl-11 text-sm">
                    <span>{group.lastMessage.sender.name}</span>
                  </div>
                )}
                <div className="flex w-full gap-1">
                  {!isMe && (
                    <Avatar
                      className="mb-0.5 mt-auto h-7 w-7"
                      src={group.lastMessage.sender.avatar}
                      alt={group.lastMessage.sender.name}
                    />
                  )}
                  <MessageItemGroup>
                    {group.messages.map((message) => (
                      <MessageItem
                        key={message._id}
                        message={message}
                        sender={isMe ? 'me' : 'other'}
                        readByUsers={userAtMessage[message._id]}
                      />
                    ))}
                  </MessageItemGroup>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
      {isScrolled && (
        <Button.Icon
          onClick={scrollIntoView}
          shape="circle"
          className="absolute bottom-0  left-1/2 -translate-x-1/2"
        >
          <ArrowDownIcon />
        </Button.Icon>
      )}
    </div>
  );
};
