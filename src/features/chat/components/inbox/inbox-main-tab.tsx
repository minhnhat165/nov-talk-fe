import { Tabs, TabsList, TabsTrigger } from '@/components/navigation';
import { forwardRef, useState } from 'react';

import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/actions/button';
import { InboxItem } from '../inbox-item';
import InboxList from '../inbox-list';
import Link from 'next/link';
import { Room } from '../../types';
import { SearchInput } from '@/components/data-entry';
import { Typography } from '@/components/data-display';
import { User } from '@/features/user/types';
import { UserItem } from '@/features/user/components/user-item';
import { searchApi } from '@/features/search/api/search-api';
import useAuthStore from '@/features/auth/stores/use-auth-store';
import { useSearch } from '@/hooks/use-search';

export const inboxTypeMap = {
  all: 'all',
  unread: 'unread',
};

export interface InboxMainTabProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const InboxMainTab = forwardRef<HTMLDivElement, InboxMainTabProps>(
  (props, ref) => {
    const [isSearch, setIsSearch] = useState(false);
    const [type, setType] = useState<keyof typeof inboxTypeMap>('all');
    const { data, setSearchTerm } = useSearch<{
      rooms: Room[];
      users: User[];
    }>(searchApi.inboxes);
    const currentUserId = useAuthStore((state) => state.user?._id);
    return (
      <div
        ref={ref}
        {...props}
        className="flex h-full flex-col overflow-hidden"
      >
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
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="relative flex flex-1 flex-col overflow-hidden">
          <Tabs
            value={type}
            onValueChange={(value) => {
              setType(value as keyof typeof inboxTypeMap);
            }}
            defaultValue="all"
            className="mx-4 w-44 pb-2"
          >
            <TabsList className="grid grid-cols-2">
              {Object.entries(inboxTypeMap).map(([key, value]) => (
                <TabsTrigger key={key} value={key} className="capitalize">
                  {value}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <InboxList type={type} />
          {isSearch && (
            <div className="absolute left-0 top-0 h-full w-full overflow-y-scroll bg-card px-2">
              {data?.users && data.users.length > 0 && (
                <SearchSection label="People">
                  {data?.users.map((user) => (
                    <Link key={user._id} href={`/talk/${user._id}`}>
                      <UserItem user={user} />
                    </Link>
                  ))}
                </SearchSection>
              )}
              {data?.rooms && data.rooms.length > 0 && (
                <SearchSection label="Groups">
                  {data?.rooms.map((room) => (
                    <InboxItem
                      key={room._id}
                      data={room}
                      currentUserId={currentUserId!}
                    />
                  ))}
                </SearchSection>
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);
InboxMainTab.displayName = 'InboxMainTab';

const SearchSection = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="pb-2">
      <div className="pl-2">
        <Typography variant="h5">{label}</Typography>
      </div>
      <div>{children}</div>
    </div>
  );
};
