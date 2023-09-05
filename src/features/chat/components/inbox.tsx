'use client';

import { Cog6ToothIcon, SquaresPlusIcon } from '@heroicons/react/24/solid';

import { Button } from '@/components/actions/button';
import { ChatSetting } from './chat-setting';
import { InboxFilter } from './inbox-filter';
import { InboxItem } from '@/features/chat/components/inbox-item';
import Link from 'next/link';
import { Typography } from '@/components/data-display';
import { cn } from '@/lib/utils';
import { roomsData } from '@/data/room';
import { useQueryParams } from '@/hooks/use-query-params';
import { useScrollDistanceFromTop } from '@/hooks/use-scroll-distance-from-top';
import { useSearchParams } from 'next/navigation';

export interface InboxProps {}

const inboxTabs = {
  default: 'inbox',
  settings: 'settings',
  create: 'new',
};

export const Inbox = (props: InboxProps) => {
  const tab = useSearchParams().get('tab') ?? inboxTabs.default;

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-md bg-card">
      <Header />
      <div className="flex-1 overflow-hidden">{inboxTabsMap[tab]}</div>
    </div>
  );
};

const Header = () => {
  const { createQueryString, pathname } = useQueryParams();
  return (
    <div className="flex justify-between p-4 pb-0">
      <Typography variant="h3">Talks</Typography>
      <div className="-mr-2">
        <Link
          href={pathname + '?' + createQueryString('tab', inboxTabs.settings)}
        >
          <Button.Icon size="sm" variant="ghost" shape="circle">
            <Cog6ToothIcon />
          </Button.Icon>
        </Link>

        <Link
          href={pathname + '?' + createQueryString('tab', inboxTabs.create)}
        >
          <Button.Icon size="sm" variant="ghost" shape="circle">
            <SquaresPlusIcon />
          </Button.Icon>
        </Link>
      </div>
    </div>
  );
};

const InboxDefaultTab = () => {
  return (
    <div className="flex h-full flex-col">
      <InboxFilter />
      <InboxList />
    </div>
  );
};

const InboxList = () => {
  const { isScrolled, ref: scrollRef } = useScrollDistanceFromTop(1);
  return (
    <div
      ref={scrollRef}
      className={cn(
        'relative flex flex-1 flex-col gap-2 overflow-y-scroll p-2',
        isScrolled && 'border-t',
      )}
    >
      {roomsData.map((room) => (
        <InboxItem key={room._id} data={room} />
      ))}
    </div>
  );
};

const inboxTabsMap = {
  [inboxTabs.default]: <InboxDefaultTab />,
  [inboxTabs.settings]: (
    <div className="absolute left-0 top-0 h-full w-full">
      <ChatSetting />
    </div>
  ),
  [inboxTabs.create]: <div>Create</div>,
};
