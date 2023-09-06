import { Children, ReactNode, cloneElement, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';

import { Avatar } from '@/components/data-display/avatar';
import { Message } from '@/features/chat/types';
import { User } from '@/features/user/types/user';
import { cn } from '@/lib/utils';

const messageVariants = cva('w-fit min-w-[2.25rem] rounded-3xl p-2 px-3', {
  variants: {
    sender: {
      me: 'ml-auto  bg-primary text-primary-foreground',
      other: 'mr-auto bg-background text-background-foreground',
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
});

export interface MessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof messageVariants> {
  message: Message;
  readByUsers?: User[];
}

export const MessageItem = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, sender, order, className, readByUsers, ...props }, ref) => {
    return (
      <div className="relative">
        <div
          {...props}
          ref={ref}
          className={cn(messageVariants({ sender, order }), className)}
        >
          {message.content}
        </div>
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
      </div>
    );
  },
);

MessageItem.displayName = 'MessageItem';

interface MessageItemGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MessageItemGroup = forwardRef<
  HTMLDivElement,
  MessageItemGroupProps
>((props, ref) => {
  const renderChildrenWithOrder = (children: ReactNode) => {
    return Children.map(children, (child, index) => {
      const length = Children.count(children);
      let order = 'middle';
      if (length === 1) {
        order = 'default';
      } else if (index === 0) {
        order = 'first';
      } else if (index === length - 1) {
        order = 'last';
      }
      const cloneChild = child as React.ReactElement;
      return cloneElement(cloneChild, {
        order,
        ...cloneChild.props,
      });
    });
  };
  return (
    <div
      ref={ref}
      className={cn('flex flex-1 flex-col-reverse gap-0.5', props.className)}
    >
      {props.children && renderChildrenWithOrder(props.children)}
    </div>
  );
});

MessageItemGroup.displayName = 'MessageItemGroup';
