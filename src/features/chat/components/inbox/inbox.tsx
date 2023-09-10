'use client';

import {
  ArrowLeftIcon,
  Cog6ToothIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/solid';
import { Tabs, TabsList, TabsTrigger } from '@/components/navigation/tabs';

import { Button } from '@/components/actions/button';
import { ChatCreator } from '@/features/chat/components/chat-creator';
import { ChatSetting } from '@/features/chat/components/chat-setting';
import { InboxContext } from './inbox-context';
import InboxList from '@/features/chat/components/inbox-list';
import { SearchInput } from '@/components/data-entry';
import { Typography } from '@/components/data-display';
import { useState } from 'react';

export interface InboxProps {}

export type InboxTabs = 'default' | 'settings' | 'create';

const componentsMap: Record<InboxTabs, React.ReactNode> = {
  settings: <ChatSetting />,
  create: <ChatCreator />,
  default: null,
};

export const Inbox = (props: InboxProps) => {
  const [currentTab, setCurrentTab] = useState<InboxTabs>('default');

  return (
    <InboxContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        backToDefault: () => setCurrentTab('default'),
      }}
    >
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-md bg-card">
        <Header
          onTabChange={(tab) => {
            setCurrentTab(tab);
          }}
        />
        <div className="flex-1 overflow-hidden">
          <InboxDefaultTab />
        </div>
        {currentTab != 'default' && (
          <div className="absolute left-0 top-0 flex h-full w-full flex-col bg-card">
            <div className="flex items-center gap-2 p-4 pb-0">
              <Button.Icon
                onClick={() => setCurrentTab('default')}
                variant="ghost"
                size="sm"
                shape="circle"
                className="-ml-2"
              >
                <ArrowLeftIcon />
              </Button.Icon>
              <Typography variant="h3" className="capitalize">
                {currentTab.toString()}
              </Typography>
            </div>
            <div className="flex-1 overflow-hidden">
              {componentsMap[currentTab]}
            </div>
          </div>
        )}
      </div>
    </InboxContext.Provider>
  );
};

const Header = ({
  onTabChange,
}: {
  onTabChange?: (tab: InboxTabs) => void;
}) => {
  return (
    <div className="flex justify-between p-4 pb-0">
      <Typography variant="h3">Talks</Typography>
      <div className="-mr-2">
        <Button.Icon
          onClick={() => onTabChange?.('settings')}
          size="sm"
          variant="ghost"
          shape="circle"
        >
          <Cog6ToothIcon />
        </Button.Icon>

        <Button.Icon
          onClick={() => onTabChange?.('create')}
          size="sm"
          variant="ghost"
          shape="circle"
        >
          <SquaresPlusIcon />
        </Button.Icon>
      </div>
    </div>
  );
};
export const inboxTypeMap = {
  all: 'all',
  unread: 'unread',
};
const InboxDefaultTab = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [type, setType] = useState<keyof typeof inboxTypeMap>('all');
  return (
    <div className="flex h-full flex-col overflow-hidden">
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
          <div className="absolute left-0 top-0 min-h-full w-full bg-card"></div>
        )}
      </div>
    </div>
  );
};
