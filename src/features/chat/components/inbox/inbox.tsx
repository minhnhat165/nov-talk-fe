'use client';

import {
  ArrowLeftIcon,
  Cog6ToothIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/solid';

import { Button } from '@/components/actions/button';
import { ChatCreator } from '@/features/chat/components/chat-creator';
import { ChatSetting } from '@/features/chat/components/chat-setting';
import { InboxContext } from './inbox-context';
import { InboxMainTab } from './inbox-main-tab';
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
          <InboxMainTab />
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
