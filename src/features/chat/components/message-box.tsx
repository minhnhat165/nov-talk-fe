'use client';

import {
  MessageItem,
  MessageItemGroup,
} from '@/features/chat/components/message-item';

import { ArrowDownIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/actions/button';
import { Message } from '@/features/chat/types/message';
import { messagesRoomData } from '@/data/message';
import moment from 'moment';
import { useRef } from 'react';
import { useScrollDistanceFromTop } from '@/hooks/use-scroll-distance-from-top';
import { useScrollIntoView } from '@/hooks/use-scroll-to';

const maxTimeDiff = 5; // 5 minutes
const maxTimeGroupDiff = 10; // 10 minutes
type MessageGroup = {
  messages: Message[];
  lastMessage: Message;
};
export const MessageBox = () => {
  const messagesData = messagesRoomData;
  const { ref, isScrolled } = useScrollDistanceFromTop(0, true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const { scrollIntoView } = useScrollIntoView(bottomRef);

  const messagesGroup = messagesData.reduce((acc, message) => {
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

  return (
    <div className="relative flex h-full w-full flex-1 overflow-hidden">
      <div
        ref={ref}
        className="flex w-full flex-1 flex-col-reverse overflow-y-scroll bg-primary/5 px-4 py-4"
      >
        <div ref={bottomRef} className="h-1 w-1" />
        {messagesGroup.map((group, index) => {
          const timeDiff = moment(moment(group.lastMessage.createdAt)).diff(
            messagesGroup[index + 1]?.messages[0].createdAt ?? moment(),
            'minute',
          );
          const isShowTimeGroup = timeDiff > maxTimeGroupDiff;
          return (
            <div key={group.lastMessage._id}>
              {isShowTimeGroup && (
                <div className="my-4 flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <div className="h-[1px] w-16 bg-primary/30" />
                    <div className="text-sm text-primary/60">
                      {timeDisplay(group.lastMessage.createdAt!)}
                    </div>
                    <div className="h-[1px] w-16 bg-primary/30" />
                  </div>
                </div>
              )}
              <MessageItemGroup>
                {group.messages.map((message) => (
                  <MessageItem
                    key={message._id}
                    message={message}
                    sender={message.sender._id === '1' ? 'me' : 'other'}
                  />
                ))}
              </MessageItemGroup>
            </div>
          );
        })}
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

const timeDisplay = (time: string) => {
  const dateMoment = moment(time);

  if (dateMoment.get('year') !== moment().get('year')) {
    return dateMoment.format('MMM DD, YYYY, LT');
  }
  switch (moment().diff(dateMoment, 'day')) {
    case 0:
      return dateMoment.format('LT');
    case 1:
      return 'Yesterday, ' + dateMoment.format('LT');
    default:
      return dateMoment.format('MMM DD, LT');
  }
};
