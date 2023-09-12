'use client';

import { Cog6ToothIcon, UserIcon } from '@heroicons/react/24/solid';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../actions/dropdown-menu';

import { Avatar } from '../data-display/avatar';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import useAuthStore from '@/features/auth/stores/use-auth-store';

export interface SideBarProps {}

export const Sidebar = (props: SideBarProps) => {
  const user = useAuthStore((state) => state.user);
  if (!user) return null;
  return (
    <div className="flex h-screen w-16 flex-col border border-l bg-card p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="mt-auto flex items-center justify-center rounded-lg bg-background p-1">
            <Avatar src={user.avatar} alt={user.name} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={10}
          side="left"
          align="end"
          alignOffset={0}
          className="w-56"
        >
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={`remote/profile/${user._id}}`}>
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem disabled>
              <Cog6ToothIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <Link href="/logout">
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
