import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/navigation/tabs';

import { SearchInput } from '@/components/data-entry';

export interface InboxFilterProps {}

export const InboxFilter = (props: InboxFilterProps) => {
  return (
    <div className="w-full space-y-2 p-4 py-2">
      <SearchInput btnDisabled placeholder="Search talker" />
      <Tabs defaultValue="all" className="w-44">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
