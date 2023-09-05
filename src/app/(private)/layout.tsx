import { Sidebar } from '@/components/layout';
import { appConfig } from '@/configs/app';
import { cookies } from 'next/headers';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentSite = cookies().get('site');
  return (
    <div className="flex">
      {currentSite?.value === appConfig.siteName.local && <Sidebar />}
      <div className="flex-1">{children}</div>
    </div>
  );
}
