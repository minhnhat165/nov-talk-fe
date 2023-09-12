import { VariantProps, cva } from 'class-variance-authority';

import { Avatar } from '@/components/data-display/avatar';
import { DocumentIcon } from '@heroicons/react/24/solid';
import { Message } from '@/features/chat/types';
import { MessageImgGallery } from './message-img-gallery';
import { User } from '@/features/user/types/user';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const messageVariants = cva(
  'w-fit max-w-xl min-w-[2.25rem] overflow-hidden rounded-3xl',
  {
    variants: {
      sender: {
        me: 'ml-auto relative ',
        other: 'mr-auto',
      },
      order: {
        default: 'rounded-3xl',
        first: '',
        middle: 'rounded-3xl',
        last: '',
      },
    },

    compoundVariants: [
      {
        sender: 'me',
        order: 'first',
        className: 'rounded-tr-lg',
      },
      {
        sender: 'me',
        order: 'middle',
        className: 'rounded-r-lg',
      },
      {
        sender: 'me',
        order: 'last',
        className: 'rounded-br-lg',
      },
      {
        sender: 'other',
        order: 'first',
        className: 'rounded-tl-lg',
      },
      {
        sender: 'other',
        order: 'middle',
        className: 'rounded-l-lg',
      },
      {
        sender: 'other',
        order: 'last',
        className: 'rounded-bl-lg',
      },
    ],
    defaultVariants: {
      sender: 'other',
      order: 'default',
    },
  },
);

export interface MessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof messageVariants> {
  message: Message;
  readByUsers?: User[];
}

export const MessageItem = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, sender, order, className, readByUsers, ...props }, ref) => {
    return (
      <div className={cn('relative', sender === 'me' ? 'pl-20' : 'pr-20')}>
        <div
          {...props}
          ref={ref}
          className={cn(
            messageVariants({ sender, order }),
            className,
            message.media?.length &&
              message.media?.length > 1 &&
              'rounded-none',
          )}
        >
          {message.content && (
            <div
              className={cn(
                'px-3 py-2',
                sender === 'me'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-background-foreground bg-background',
              )}
            >
              <span className="break-all">{message.content}</span>
            </div>
          )}
          {message?.media && message.media.length > 0 && (
            <>
              {message.media[0].type === 'image' && (
                <MessageImgGallery images={message.media} />
              )}
              {message.media[0].type === 'document' && (
                <a
                  download
                  href={message.media[0].url}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary/10 p-2 px-3"
                >
                  <DocumentIcon className="h-8 w-8 text-primary/60" />
                  <div className="flex flex-col">
                    <span title={message.media[0].name} className="text-sm">
                      {message.media[0].name}
                    </span>
                    <span className="text-xs text-primary/60">
                      {formatFileSize(message.media[0].size!)}
                    </span>
                  </div>
                </a>
              )}
            </>
          )}
        </div>
        {readByUsers?.length && (
          <div
            className={cn(
              'ml-auto flex justify-end space-x-0.5',
              sender === 'me' ? 'mt-1' : 'absolute bottom-0 right-0',
            )}
          >
            {readByUsers?.map((user) => (
              <Avatar
                key={user._id}
                src={user.avatar}
                alt={user.name}
                className="h-4 w-4"
              />
            ))}
          </div>
        )}
        {message.status === 'pending' && (
          <div className="text-end text-sm text-text/80">
            <span>sending</span>
          </div>
        )}
      </div>
    );
  },
);

MessageItem.displayName = 'MessageItem';

const formatFileSize = (size: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let index = 0;
  while (size >= 1024) {
    size /= 1024;
    index++;
  }
  return `${size.toFixed(2)} ${units[index]}`;
};
