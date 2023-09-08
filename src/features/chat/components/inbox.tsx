'use client';

import {
  ArrowLeftIcon,
  Cog6ToothIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/solid';
import { Tabs, TabsList, TabsTrigger } from '@/components/navigation/tabs';
import { useParams, useSearchParams } from 'next/navigation';

import { Button } from '@/components/actions/button';
import { ChatSetting } from './chat-setting';
import { InboxItem } from '@/features/chat/components/inbox-item';
import Link from 'next/link';
import { SearchInput } from '@/components/data-entry';
import { Typography } from '@/components/data-display';
import { cn } from '@/lib/utils';
import { roomsData } from '@/data/room';
import useAuthStore from '@/features/auth/stores/use-auth-store';
import { useQueryParams } from '@/hooks/use-query-params';
import { useScrollDistanceFromTop } from '@/hooks/use-scroll-distance-from-top';
import { useState } from 'react';
import useStore from '@/stores/use-store';

export interface InboxProps {}

const inboxTabs = {
  default: 'inbox',
  settings: 'settings',
  create: 'new',
};

export const Inbox = (props: InboxProps) => {
  const tab = useSearchParams()?.get('tab') ?? inboxTabs.default;

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
  const [isSearch, setIsSearch] = useState(false);
  return (
    <div className="flex h-full flex-col">
      <div className="flex w-full gap-1 px-4 py-2">
        {isSearch && (
          <Button.Icon
            shape="circle"
            variant="ghost"
            onClick={() => setIsSearch(false)}
            className="-ml-2"
          >
            <ArrowLeftIcon />
          </Button.Icon>
        )}
        <div className="flex-1">
          <SearchInput
            onFocus={() => setIsSearch(true)}
            btnDisabled
            placeholder="Search talker"
          />
        </div>
      </div>
      <div className="relative flex flex-1 flex-col">
        <Tabs defaultValue="all" className="mx-4 w-44 pb-2">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
        </Tabs>
        <InboxList />
        {isSearch && (
          <div className="absolute left-0 top-0 min-h-full w-full bg-card"></div>
        )}
      </div>
    </div>
  );
};

const InboxList = () => {
  const { isScrolled, ref: scrollRef } = useScrollDistanceFromTop(1);
  const params = useParams();
  const id = params?.id;
  const currentUserId = useStore(useAuthStore, (s) => s.user?._id);
  return (
    <div
      ref={scrollRef}
      className={cn(
        'relative flex flex-1 flex-col gap-2 overflow-y-scroll p-2',
        isScrolled && 'border-t',
      )}
    >
      {roomsData.map((room) => (
        <Link key={room._id} href={`/talk/${room._id}`}>
          <InboxItem key={room._id} data={room} isActive={id === room._id} />
        </Link>
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
