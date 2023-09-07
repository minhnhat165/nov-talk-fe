import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/actions/button';
import Link from 'next/link';
import { Typography } from '@/components/data-display';
import { useQueryParams } from '@/hooks/use-query-params';

export interface ChatSettingProps {}

export const ChatSetting = (props: ChatSettingProps) => {
  const { pathname } = useQueryParams();
  return (
    <div className="h-full w-full rounded-md bg-card shadow-sm">
      <div className="flex items-center gap-2 p-4">
        <Link href={pathname!}>
          <Button.Icon
            variant="ghost"
            size="sm"
            shape="circle"
            className="-ml-2"
          >
            <ArrowLeftIcon />
          </Button.Icon>
        </Link>
        <Typography variant="h3">Settings</Typography>
      </div>
    </div>
  );
};
