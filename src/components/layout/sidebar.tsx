'use client';

import useAuthStore from '@/features/auth/stores/use-auth-store';

export interface SideBarProps {}

export const Sidebar = (props: SideBarProps) => {
  const userId = useAuthStore((state) => state.user?._id);
  return <div className="h-screen w-16 border border-l bg-card">SideBar</div>;
};
